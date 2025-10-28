import { useEffect, useState, useRef, useCallback } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import SectorService from '@/services/sector.service';
import { SectorDataParser } from '@/tools/data.tool';
import { ANIMATION_MODE } from '@/configs/const.config';
import { useDispatch } from 'react-redux';
import { animationActions } from '@/redux/slices/animation.slice';
import { FRAMES_COUNT, SECTOR_SIZE, WORLD_DIMENSION } from '@/configs/env.config';


export default function SectorLayer() {
    const map = useMap();

    // ================== States ==================
    const [sectors, setSectors] = useState(new Map());
    const [visibleSectors, setVisibleSectors] = useState(new Set());

    const { mode, frame, speed } = useSelector((state) => state.animation);

    const dispatch = useDispatch();

    const layerRef = useRef(L.layerGroup()).current;

    // ================== Animation Loop ==================
    useEffect(() => {
        const frameInterval = setInterval(() => {
            if (mode === ANIMATION_MODE.DYNAMIC) {
                dispatch(animationActions.setStates({ field: "frame", value: (frame + 1) % FRAMES_COUNT }))
            }
        }, speed);

        return () => clearInterval(frameInterval);
    }, [mode, speed, frame]);

    // ================== Visible Sectors ==================
    const updateVisibleSectors = useCallback(() => {
        const bounds = map.getBounds();

        const west = Math.max(0, bounds.getWest());
        const east = Math.min(WORLD_DIMENSION, bounds.getEast());
        const north = Math.max(0, bounds.getNorth());
        const south = Math.min(WORLD_DIMENSION, bounds.getSouth());

        const newVisible = new Set();

        const startX = Math.floor(west / SECTOR_SIZE);
        const endX = Math.ceil(east / SECTOR_SIZE);
        const startY = Math.floor(north / SECTOR_SIZE);
        const endY = Math.ceil(south / SECTOR_SIZE);

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                if (
                    x >= 0 &&
                    y >= 0 &&
                    x < WORLD_DIMENSION / SECTOR_SIZE &&
                    y < WORLD_DIMENSION / SECTOR_SIZE
                ) {
                    newVisible.add(`${x}:${y}`);
                }
            }
        }

        setVisibleSectors(newVisible);
    }, [map]);

    useMapEvents({
        moveend: updateVisibleSectors,
        zoomend: updateVisibleSectors,
        viewreset: updateVisibleSectors,
        load: updateVisibleSectors,
    });

    // ================== Fetch New Sectors ==================
    useEffect(() => {
        visibleSectors.forEach(async (sectorId) => {
            if (!sectors.has(sectorId)) {
                const [x, y] = sectorId.split(':').map(Number);
                const [data, err] = await SectorService.get(x, y);

                if (err) {
                    console.error(`Failed to load sector ${sectorId}:`, err);
                    return;
                }

                const parser = new SectorDataParser(data.frames, data.accountLegend);
                const frameCanvases = [];

                for (let i = 0; i < FRAMES_COUNT; i++) {
                    const canvas = document.createElement('canvas');
                    canvas.width = SECTOR_SIZE;
                    canvas.height = SECTOR_SIZE;

                    const ctx = canvas.getContext('2d');
                    if (!ctx) continue;
                    ctx.imageSmoothingEnabled = false;

                    for (let py = 0; py < SECTOR_SIZE; py++) {
                        for (let px = 0; px < SECTOR_SIZE; px++) {
                            const pixel = parser.getPixel(i, px, py);
                            if (pixel && pixel.color) {
                                ctx.fillStyle = pixel.color;
                                ctx.fillRect(px, py, 1, 1);
                            }
                        }
                    }

                    frameCanvases.push(canvas);
                }

                setSectors((prev) => {
                    const next = new Map(prev);
                    next.set(sectorId, { ...data, frameCanvases });
                    return next;
                });
            }
        });
    }, [visibleSectors, sectors]);

    // ================== Draw Sectors ==================
    useEffect(() => {
        visibleSectors.forEach((sectorId) => {
            const sector = sectors.get(sectorId);
            if (!sector || !sector.frameCanvases) return;

            const canvas = sector.frameCanvases[frame];
            if (!canvas) return;

            const [x, y] = sectorId.split(':').map(Number);
            const bounds = [
                [y * SECTOR_SIZE, x * SECTOR_SIZE],
                [(y + 1) * SECTOR_SIZE, (x + 1) * SECTOR_SIZE],
            ];

            const existing = layerRef
                .getLayers()
                .find((l) => l.options && l.options.sectorId === sectorId);

            if (existing) {
                existing.setUrl(canvas.toDataURL());
            } else {
                const overlay = L.imageOverlay(canvas.toDataURL(), bounds, {
                    interactive: true,
                    className: 'pixelated-canvas',
                    sectorId,
                });
                overlay.addTo(layerRef);
            }
        });
    }, [frame, visibleSectors, sectors, layerRef]);

    // ================== Layer Lifecycle ==================
    useEffect(() => {
        layerRef.addTo(map);
        return () => {
            map.removeLayer(layerRef);
        };
    }, [map, layerRef]);

    return null;
}
