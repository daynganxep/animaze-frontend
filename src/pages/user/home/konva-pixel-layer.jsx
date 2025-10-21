import { useEffect, useState, useCallback, useRef } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { useSelector } from 'react-redux';

import SectorService from '@/services/sector.service';
import { SECTOR_SIZE, SectorDataParser } from '@/tools/data.tool';
import env from '@/configs/env.config';
import { FRAMES_COUNT } from '@/tools/data.tool';
import { screenToWorld, worldToSector } from '@/tools/coordinate-converter';

const WORLD_DIMENSION = env.canvas_size; // e.g., 2560000

function KonvaPixelLayer() {
    const map = useMap();
    const { mode: animationMode, staticFrame, animationSpeed } = useSelector(state => state.animation);

    const [sectorImages, setSectorImages] = useState(new Map()); // Cache for rendered sector images (Map<sectorId, HTMLCanvasElement[]>)
    const [visibleSectorIds, setVisibleSectorIds] = useState(new Set());
    const [layerState, setLayerState] = useState({
        x: 0,
        y: 0,
        scale: 1,
    });
    const [hoveredCoords, setHoveredCoords] = useState(null); // { worldX, worldY, sectorX, sectorY }
    const [currentAnimationFrame, setCurrentAnimationFrame] = useState(0); // 0-3

    // --- Animation Loop for Frames ---
    useEffect(() => {
        if (animationMode !== 'ALL') {
            setCurrentAnimationFrame(staticFrame);
            return;
        }

        const interval = setInterval(() => {
            setCurrentAnimationFrame(prevFrame => (prevFrame + 1) % FRAMES_COUNT);
        }, animationSpeed);

        return () => clearInterval(interval);
    }, [animationMode, animationSpeed, staticFrame]);

    // Function to calculate visible sectors and update Konva stage state
    const updateKonvaLayerState = useCallback(() => {
        const currentZoom = map.getZoom();
        const konvaScale = map.getZoomScale(currentZoom); // At zoom 0, scale is 1. At zoom 1, scale is 2, etc.

        const pixelOrigin = map.getPixelOrigin();
        const konvaX = pixelOrigin.x;
        const konvaY = pixelOrigin.y;

        setLayerState({ x: konvaX, y: konvaY, scale: konvaScale });

        // Calculate visible sectors
        const bounds = map.getBounds(); // Get LatLngBounds of the visible area
        const nw = bounds.getNorthWest();
        const se = bounds.getSouthEast();

        // Convert Leaflet LatLng (which are world coords for our CustomSimpleCRS) to our world pixel coords
        // Ensure coordinates are within world bounds [0, WORLD_DIMENSION]
        const worldX1 = Math.max(0, Math.floor(nw.lng));
        const worldY1 = Math.max(0, Math.floor(nw.lat));
        const worldX2 = Math.min(WORLD_DIMENSION, Math.ceil(se.lng));
        const worldY2 = Math.min(WORLD_DIMENSION, Math.ceil(se.lat));

        const startSectorX = Math.floor(worldX1 / SECTOR_SIZE);
        const endSectorX = Math.ceil(worldX2 / SECTOR_SIZE);
        const startSectorY = Math.floor(worldY1 / SECTOR_SIZE);
        const endSectorY = Math.ceil(worldY2 / SECTOR_SIZE);

        const newVisibleSectorIds = new Set();
        for (let sy = startSectorY; sy < endSectorY; sy++) {
            for (let sx = startSectorX; sx < endSectorX; sx++) {
                if (sx >= 0 && sx * SECTOR_SIZE < WORLD_DIMENSION && sy >= 0 && sy * SECTOR_SIZE < WORLD_DIMENSION) {
                    newVisibleSectorIds.add(`${sx}:${sy}`);
                }
            }
        }
        setVisibleSectorIds(newVisibleSectorIds);
    }, [map]);

    // Listen to Leaflet map events to update Konva layer state
    useMapEvents({
        zoomend: updateKonvaLayerState,
        moveend: updateKonvaLayerState,
        // Initial update on mount
        whenReady: updateKonvaLayerState,
    });

    // Effect to fetch and draw visible sectors (all 4 frames)
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
            return allFrameCanvases;
        };

        const newSectorImages = new Map(sectorImages);
        const sectorsToFetch = [];

        visibleSectorIds.forEach(sectorId => {
            if (!newSectorImages.has(sectorId)) {
                sectorsToFetch.push(sectorId);
            }
        });

        // Remove images for sectors no longer visible
        sectorImages.forEach((_, sectorId) => {
            if (!visibleSectorIds.has(sectorId)) {
                newSectorImages.delete(sectorId);
            }
        });

        Promise.all(sectorsToFetch.map(async (sectorId) => {
            const framesCanvases = await fetchAndDrawAllSectorFrames(sectorId);
            if (framesCanvases) {
                newSectorImages.set(sectorId, framesCanvases);
            }
        })).then(() => {
            setSectorImages(newSectorImages);
        });

    }, [visibleSectorIds, map, sectorImages]);

    // Handle mouse move on Konva Stage to display coordinates
    const handleMouseMove = (e) => {
        const stage = e.target.getStage();
        const pointerPosition = stage.getPointerPosition();
        if (!pointerPosition) return;

        // Convert screen coordinates to world coordinates
        const [worldX, worldY] = screenToWorld([pointerPosition.x, pointerPosition.y], map);
        const [sectorX, sectorY] = worldToSector([worldX, worldY]);

        setHoveredCoords({ worldX, worldY, sectorX, sectorY });
    };

    // Determine which frame to display
    const frameToDisplay = animationMode === 'STATIC' ? staticFrame : currentAnimationFrame;

    return (
        <>
            <Stage
                x={layerState.x}
                y={layerState.y}
                scaleX={layerState.scale}
                scaleY={layerState.scale}
                width={map.getSize().x}
                height={map.getSize().y}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredCoords(null)}
            >
                <Layer>
                    {Array.from(visibleSectorIds).map(sectorId => {
                        const [sx, sy] = sectorId.split(':').map(Number);
                        const allFramesCanvases = sectorImages.get(sectorId);
                        if (allFramesCanvases && allFramesCanvases[frameToDisplay]) {
                            // Position KonvaImage at its world coordinate
                            return <KonvaImage
                                key={sectorId}
                                image={allFramesCanvases[frameToDisplay]}
                                x={sx * SECTOR_SIZE}
                                y={sy * SECTOR_SIZE}
                                width={SECTOR_SIZE}
                                height={SECTOR_SIZE}
                                imageRendering={'pixelated'} // Ensure pixels are sharp
                            />;
                        }
                        return null;
                    })}
                </Layer>
            </Stage>
            {hoveredCoords && (
                <div style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    zIndex: 1001,
                    fontSize: '0.8em'
                }}>
                    World: ({hoveredCoords.worldX}, {hoveredCoords.worldY})<br/>
                    Sector: ({hoveredCoords.sectorX}, {hoveredCoords.sectorY})
                </div>
            )}
        </>
    );
}

export default KonvaPixelLayer;
