import { useEffect, useState, useRef, useCallback } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import SectorService from '@/services/sector.service';
import { SectorDataParser } from '@/tools/data.tool';
import { ANIMATION_MODE, MIN_VISIBLE_ZOOM, SECTOR_DEBOUD } from '@/configs/const.config';
import { useDispatch } from 'react-redux';
import { animationActions } from '@/redux/slices/animation.slice';
import { FRAMES_COUNT, SECTOR_SIZE, WORLD_DIMENSION } from '@/configs/env.config';
import { useSectorsCache } from '@/hooks/use-sectors-cache';
import { useDebounce } from '@/hooks/use-debounce';
import { debounce } from 'lodash';

export default function Sectors() {
    const map = useMap();
    const sectorsCache = useSectorsCache();
    const [visibleSectors, setVisibleSectors] = useState(new Set());
    const debouncedVisibleSectors = useDebounce(visibleSectors, SECTOR_DEBOUD);
    const { mode, frame, speed } = useSelector((state) => state.animation);
    const dispatch = useDispatch();
    const layerRef = useRef(L.layerGroup()).current;
    const { paintMode } = useSelector(state => state.ui);


    useEffect(() => {
        const frameInterval = setInterval(() => {
            if (mode === ANIMATION_MODE.DYNAMIC) {
                dispatch(animationActions.setStates({ field: "frame", value: (frame + 1) % FRAMES_COUNT }));
            }
        }, speed);
        return () => clearInterval(frameInterval);
    }, [mode, speed, frame, dispatch]);

    const updateVisibleSectors = useCallback(() => {
        if (paintMode) return;
        if (map.getZoom() < MIN_VISIBLE_ZOOM) {
            layerRef.clearLayers();
            setVisibleSectors(new Set());
            return;
        }

        const bounds = map.getBounds();
        const west = Math.max(0, bounds.getWest());
        const east = Math.min(WORLD_DIMENSION, bounds.getEast());
        const south = Math.max(0, bounds.getSouth());
        const north = Math.min(WORLD_DIMENSION, bounds.getNorth());

        const newVisible = new Set();
        const startX = Math.floor(west / SECTOR_SIZE);
        const endX = Math.ceil(east / SECTOR_SIZE);
        const startY = Math.floor(south / SECTOR_SIZE);
        const endY = Math.ceil(north / SECTOR_SIZE);

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                if (x >= 0 && y >= 0 && x < WORLD_DIMENSION / SECTOR_SIZE && y < WORLD_DIMENSION / SECTOR_SIZE) {
                    newVisible.add(`${x}:${y}`);
                }
            }
        }
        setVisibleSectors(newVisible);
    }, [map, layerRef, paintMode]);

    const debouncedUpdateVisibleSectors = useCallback(debounce(updateVisibleSectors, SECTOR_DEBOUD), [updateVisibleSectors]);

    useMapEvents({
        moveend: debouncedUpdateVisibleSectors,
        zoomend: debouncedUpdateVisibleSectors,
        viewreset: debouncedUpdateVisibleSectors,
        load: debouncedUpdateVisibleSectors,
    });

    useEffect(() => {
        const fetchNewSectors = async () => {
            const fetchPromises = Array.from(debouncedVisibleSectors).map(async (sectorId) => {
                const cached = sectorsCache.get(sectorId);
                const [x, y] = sectorId.split(':').map(Number);
                const [data, err] = await SectorService.get(x, y, cached?.etag);

                if (err) {
                    if (cached) return { sectorId, data: cached };
                    return null;
                }

                if (!data) {
                    return { sectorId, data: cached };
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

                return { sectorId, data: { ...data, frameCanvases } };
            });

            const results = await Promise.all(fetchPromises);
            results.forEach((result) => result && sectorsCache.set(result.sectorId, result.data));
        };

        fetchNewSectors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedVisibleSectors]);

    useEffect(() => {
        visibleSectors.forEach((sectorId) => {
            const sector = sectorsCache.get(sectorId);
            if (!sector || !sector.frameCanvases) return;

            const canvas = sector.frameCanvases[frame];
            if (!canvas) return;

            const [x, y] = sectorId.split(':').map(Number);
            const bounds = [
                [y * SECTOR_SIZE, x * SECTOR_SIZE],
                [(y + 1) * SECTOR_SIZE, (x + 1) * SECTOR_SIZE],
            ];

            const existing = layerRef.getLayers().find((l) => l.options && l.options.sectorId === sectorId);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frame, visibleSectors, layerRef]);

    useEffect(() => {
        layerRef.addTo(map);
        return () => map.removeLayer(layerRef);
    }, [map, layerRef]);

    return null;
}

