import { useEffect, useState, useRef, useCallback } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import SectorService from '@/services/sector.service';
import { SECTOR_SIZE, SectorDataParser, FRAMES_COUNT } from '@/tools/data.tool';
import env from '@/configs/env.config';
import { useSelector } from 'react-redux';
import { ANIMATION_MODE } from '@/configs/const.config';

const WORLD_DIMENSION = env.canvas_size;

function SectorLayer() {
    const map = useMap();
    const [sectors, setSectors] = useState(new Map());
    const [visibleSectors, setVisibleSectors] = useState(new Set());
    const [currentFrame, setCurrentFrame] = useState(0);
    const { mode, staticFrame, animationSpeed } = useSelector(state => state.animation);
    const layerRef = useRef(L.layerGroup()).current;

    // Animation loop for frames
    useEffect(() => {
        const frameInterval = setInterval(() => {
            if (mode === ANIMATION_MODE.ALL) {
                setCurrentFrame(prevFrame => (prevFrame + 1) % FRAMES_COUNT);
            } else {
                setCurrentFrame(staticFrame);
            }
        }, animationSpeed);
        return () => clearInterval(frameInterval);
    }, [mode, animationSpeed]);

    // Function to calculate which sectors are visible
    const updateVisibleSectors = useCallback(() => {
        const bounds = map.getBounds();
        const newVisibleSectors = new Set();

        const startX = Math.max(0, Math.floor(bounds.getWest() / SECTOR_SIZE));
        const endX = Math.min(Math.ceil(WORLD_DIMENSION / SECTOR_SIZE), Math.ceil(bounds.getEast() / SECTOR_SIZE));
        const startY = Math.max(0, Math.floor(bounds.getNorth() / SECTOR_SIZE));
        const endY = Math.min(Math.ceil(WORLD_DIMENSION / SECTOR_SIZE), Math.ceil(bounds.getSouth() / SECTOR_SIZE));

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                newVisibleSectors.add(`${x}:${y}`);
            }
        }
        setVisibleSectors(newVisibleSectors);
    }, [map]);

    // Listen to map events
    useMapEvents({
        moveend: updateVisibleSectors,
        zoomend: updateVisibleSectors,
        viewreset: updateVisibleSectors,
        load: updateVisibleSectors,
    });

    // Fetch data for new visible sectors
    useEffect(() => {
        visibleSectors.forEach(async (sectorId) => {
            if (!sectors.has(sectorId)) {
                const [x, y] = sectorId.split(':').map(Number);
                const [data, err] = await SectorService.get(x, y);
                if (err) {
                    console.error(`Failed to load sector ${sectorId}:`, err);
                    return;
                }

                const sectorParser = new SectorDataParser(data.frames, data.accountLegend);
                const frameCanvases = [];
                for (let i = 0; i < FRAMES_COUNT; i++) {
                    const canvas = document.createElement('canvas');
                    canvas.width = SECTOR_SIZE;
                    canvas.height = SECTOR_SIZE;
                    const ctx = canvas.getContext('2d');
                    // Disable anti-aliasing for sharp pixels
                    ctx.imageSmoothingEnabled = false;

                    for (let py = 0; py < SECTOR_SIZE; py++) {
                        for (let px = 0; px < SECTOR_SIZE; px++) {
                            const pixel = sectorParser.getPixel(i, px, py);
                            if (pixel && pixel.color) {
                                ctx.fillStyle = pixel.color;
                                ctx.fillRect(px, py, 1, 1);
                            }
                        }
                    }
                    frameCanvases.push(canvas);
                }

                setSectors(prevSectors => new Map(prevSectors).set(sectorId, { ...data, frameCanvases }));
            }
        });
    }, [visibleSectors, sectors]);

    // Update the displayed frame on the canvas layer
    useEffect(() => {
        layerRef.clearLayers();
        visibleSectors.forEach(sectorId => {
            const sector = sectors.get(sectorId);
            if (sector && sector.frameCanvases && sector.frameCanvases[currentFrame]) {
                const [x, y] = sectorId.split(':').map(Number);
                const bounds = [[y * SECTOR_SIZE, x * SECTOR_SIZE], [(y + 1) * SECTOR_SIZE, (x + 1) * SECTOR_SIZE]];
                const canvas = sector.frameCanvases[currentFrame];
                L.imageOverlay(canvas.toDataURL(), bounds, {
                    interactive: true,
                    className: 'pixelated-canvas'
                }).addTo(layerRef);
            }
        });
    }, [currentFrame, visibleSectors, sectors, layerRef]);

    // Add the layer group to the map
    useEffect(() => {
        layerRef.addTo(map);
        return () => {
            map.removeLayer(layerRef);
        };
    }, [map, layerRef]);

    return null; // This component manages layers directly, no need to render anything here
}

export default SectorLayer;
