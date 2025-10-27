import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import KonvaPixelLayer from './konva-pixel-layer';
import PixelHighlighter from './PixelHighlighter';
import env from '@/configs/env.config';
import { SECTOR_SIZE, SectorDataParser, FRAMES_COUNT } from '@/tools/data.tool';
import SectorService from '@/services/sector.service';

const WORLD_DIMENSION = env.canvas_size;
const MAX_CACHE_SIZE = 500; // Limit the number of sectors cached in client memory

export const CustomSimpleCRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0),
});

function MapContainerComponent() {
    const { mode: animationMode, staticFrame, animationSpeed } = useSelector(state => state.animation);
    const [currentAnimationFrame, setCurrentAnimationFrame] = useState(0);
    const [sectorDataCache, setSectorDataCache] = useState(new Map());
    const [visibleSectorIds, setVisibleSectorIds] = useState(new Set());
    const [layerState, setLayerState] = useState({ x: 0, y: 0, scale: 1 });

    // Animation Loop
    useEffect(() => {
        if (animationMode !== 'ALL') {
            setCurrentAnimationFrame(staticFrame);
            return;
        }
        const interval = setInterval(() => {
            setCurrentAnimationFrame(prev => (prev + 1) % FRAMES_COUNT);
        }, animationSpeed);
        return () => clearInterval(interval);
    }, [animationMode, animationSpeed, staticFrame]);

    // Data Fetching and LRU Cache Management Logic
    useEffect(() => {
        const fetchAndDrawAllSectorFrames = async (sectorId) => {
            const [sx, sy] = sectorId.split(':').map(Number);
            const [sectorData, err] = await SectorService.get(sx, sy);
            if (err) {
                console.error(`Failed to fetch sector ${sectorId}:`, err);
                return null;
            }

            const { frames, accountLegend } = sectorData;
            const sectorParser = new SectorDataParser(frames, accountLegend);

            const allFrameCanvases = [];
            for (let frameIndex = 0; frameIndex < FRAMES_COUNT; frameIndex++) {
                const offscreenCanvas = document.createElement('canvas');
                offscreenCanvas.width = SECTOR_SIZE;
                offscreenCanvas.height = SECTOR_SIZE;
                const ctx = offscreenCanvas.getContext('2d');
                if (!ctx) continue;

                for (let y = 0; y < SECTOR_SIZE; y++) {
                    for (let x = 0; x < SECTOR_SIZE; x++) {
                        const pixel = sectorParser.getPixel(frameIndex, x, y);
                        if (pixel && pixel.color) {
                            ctx.fillStyle = pixel.color;
                            ctx.fillRect(x, y, 1, 1);
                        }
                    }
                }
                allFrameCanvases.push(offscreenCanvas);
            }
            return { parser: sectorParser, frames: allFrameCanvases };
        };

        const newSectorDataCache = new Map(sectorDataCache);
        const sectorsToFetch = [];

        visibleSectorIds.forEach(sectorId => {
            if (newSectorDataCache.has(sectorId)) {
                // Move to the end to mark as recently used (for LRU)
                const data = newSectorDataCache.get(sectorId);
                newSectorDataCache.delete(sectorId);
                newSectorDataCache.set(sectorId, data);
            } else {
                sectorsToFetch.push(sectorId);
            }
        });

        // LRU Cache Eviction: If cache is over size, remove the least recently used items
        while (newSectorDataCache.size + sectorsToFetch.length > MAX_CACHE_SIZE) {
            const oldestKey = newSectorDataCache.keys().next().value;
            if (oldestKey) {
                newSectorDataCache.delete(oldestKey);
            }
        }

        Promise.all(sectorsToFetch.map(async (sectorId) => {
            const data = await fetchAndDrawAllSectorFrames(sectorId);
            if (data) {
                newSectorDataCache.set(sectorId, data);
            }
        })).then(() => {
            setSectorDataCache(newSectorDataCache);
        });

    }, [visibleSectorIds]);

    const frameToDisplay = animationMode === 'STATIC' ? staticFrame : currentAnimationFrame;

    return (
        <MapContainer
            center={[WORLD_DIMENSION / 2, WORLD_DIMENSION / 2]}
            zoom={0}
            minZoom={0}
            maxZoom={18}
            crs={CustomSimpleCRS}
            maxBounds={[[0, 0], [WORLD_DIMENSION, WORLD_DIMENSION]]}
            maxBoundsViscosity={1.0}
            style={{ height: '100vh', width: '100vw', backgroundColor: '#f0f0f0' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                noWrap={true}
            />
            <KonvaPixelLayer
                sectorDataCache={sectorDataCache}
                visibleSectorIds={visibleSectorIds}
                frameToDisplay={frameToDisplay}
                layerState={layerState}
            />
            <PixelHighlighter
                sectorDataCache={sectorDataCache}
                frameToDisplay={frameToDisplay}
                setVisibleSectorIds={setVisibleSectorIds}
                setLayerState={setLayerState}
            />
        </MapContainer>
    );
}

export default MapContainerComponent;
