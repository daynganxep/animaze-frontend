// src/components/GridOverlay.jsx
import React, { useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import env from '@/configs/env.config';

/**
 * GridOverlay
 *
 * - Draws a square-cell grid corresponding to backend pixel coordinates [0..env.canvas_size].
 * - cellSize: size of each grid cell in backend pixels (default: env.sector_size)
 *
 * Approach:
 * 1. Determine visible backend pixel bounds by converting map bounds to backend pixel coords.
 * 2. For each grid line (x = k * cellSize and y = k * cellSize) inside visible range:
 *    - Convert endpoints (backendPixel -> latlng -> containerPoint) and draw line on canvas.
 * 3. Repaint on map move/zoom/resize.
 *
 * Notes:
 * - This draws only visible grid lines (better perf).
 * - Use devicePixelRatio scaling for sharpness.
 */

function latLngToBackendPixel(lat, lng) {
    // Convert lat/lng (EPSG:3857 / geographic) -> backend pixel space [0..canvas_size]
    // We use web mercator-like mapping: map longitude [-180,180] to x, latitude [-85.0511..85.0511] to y
    const size = env.canvas_size;
    const x = ((lng + 180) / 360) * size;
    // clamp latitude to Mercator bounds
    const maxLat = 85.0511287798066;
    const latClamped = Math.max(-maxLat, Math.min(maxLat, lat));
    // normalized Y in mercator projection:
    const sinLat = Math.sin((latClamped * Math.PI) / 180);
    // Web Mercator Y mapping:
    const yMerc = 0.5 - (Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI));
    const y = yMerc * size;
    return { x: Math.round(x), y: Math.round(y) };
}

function backendPixelToLatLng(px, py) {
    // inverse of above: convert backend pixel -> lat/lng (approx using Web Mercator inverse)
    const size = env.canvas_size;
    const lng = (px / size) * 360 - 180;
    const yMerc = py / size;
    const mercN = Math.PI - 2 * Math.PI * yMerc;
    const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(mercN) - Math.exp(-mercN)));
    return { lat, lng };
}

export default function GridOverlay({ cellSize = env.sector_size, lineColor = 'rgba(0,0,0,0.25)', lineWidth = 1 }) {
    const map = useMap();
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    // Helper: convert backend pixel -> container point (pixels on screen)
    function backendToContainerPoint(px, py) {
        const latlng = backendPixelToLatLng(px, py);
        // leaflet's latLngToContainerPoint expects L.LatLng-like
        return map.latLngToContainerPoint([latlng.lat, latlng.lng]);
    }

    // Draw grid into canvas
    function draw() {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const size = map.getSize();
        // resize canvas for devicePixelRatio
        canvas.width = Math.max(1, Math.floor(size.x * dpr));
        canvas.height = Math.max(1, Math.floor(size.y * dpr));
        canvas.style.width = `${size.x}px`;
        canvas.style.height = `${size.y}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing operations

        // clear
        ctx.clearRect(0, 0, size.x, size.y);

        // get visible bounds in backend-pixel space:
        const bounds = map.getBounds(); // LatLngBounds
        // convert four corners to backend pixels to get approximate viewport rectangle in backend coords
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const se = bounds.getSouthEast();
        const nw = bounds.getNorthWest();

        // Compute min/max backend X/Y by sampling the four corners and also edges midpoint (safer)
        const samples = [ne, sw, se, nw];
        const samplePixels = samples.map((ll) => latLngToBackendPixel(ll.lat, ll.lng));
        // also sample center
        const c = map.getCenter();
        samplePixels.push(latLngToBackendPixel(c.lat, c.lng));

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        samplePixels.forEach(p => {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        });

        // clamp to canvas extents
        minX = Math.max(0, Math.floor(minX));
        minY = Math.max(0, Math.floor(minY));
        maxX = Math.min(env.canvas_size, Math.ceil(maxX));
        maxY = Math.min(env.canvas_size, Math.ceil(maxY));

        // If viewport doesn't intersect world, nothing to draw
        if (minX >= maxX || minY >= maxY) return;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.beginPath();

        // vertical lines: x = k * cellSize
        const startX = Math.floor(minX / cellSize) * cellSize;
        for (let x = startX; x <= maxX; x += cellSize) {
            // convert two endpoints to container points
            const pTop = backendToContainerPoint(x, minY);
            const pBottom = backendToContainerPoint(x, maxY);
            // draw line between these points
            ctx.moveTo(pTop.x, pTop.y);
            ctx.lineTo(pBottom.x, pBottom.y);
        }

        // horizontal lines: y = k * cellSize
        const startY = Math.floor(minY / cellSize) * cellSize;
        for (let y = startY; y <= maxY; y += cellSize) {
            const pLeft = backendToContainerPoint(minX, y);
            const pRight = backendToContainerPoint(maxX, y);
            ctx.moveTo(pLeft.x, pLeft.y);
            ctx.lineTo(pRight.x, pRight.y);
        }

        ctx.stroke();

        // optional: draw thicker border for world bounds
        ctx.lineWidth = Math.max(1, lineWidth + 1);
        ctx.strokeStyle = 'rgba(0,0,0,0.4)';
        // four corners of world in container points
        const p00 = backendToContainerPoint(0, 0);
        const p0H = backendToContainerPoint(env.canvas_size, 0);
        const pH0 = backendToContainerPoint(env.canvas_size, env.canvas_size);
        const pHh = backendToContainerPoint(0, env.canvas_size);

        ctx.beginPath();
        ctx.moveTo(p00.x, p00.y);
        ctx.lineTo(p0H.x, p0H.y);
        ctx.lineTo(pH0.x, pH0.y);
        ctx.lineTo(pHh.x, pHh.y);
        ctx.closePath();
        ctx.stroke();
    }

    useEffect(() => {
        // create canvas overlay element and append to map container
        const parent = map.getContainer();
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none'; // let events pass to map
        canvas.style.zIndex = 650; // above tiles, below controls
        parent.appendChild(canvas);
        canvasRef.current = canvas;

        // initial draw
        draw();

        // redraw on map move/zoom/resize
        function scheduleDraw() {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                draw();
            });
        }

        map.on('move', scheduleDraw);
        map.on('moveend', scheduleDraw);
        map.on('zoom', scheduleDraw);
        map.on('resize', scheduleDraw);
        window.addEventListener('resize', scheduleDraw);

        // cleanup
        return () => {
            map.off('move', scheduleDraw);
            map.off('moveend', scheduleDraw);
            map.off('zoom', scheduleDraw);
            map.off('resize', scheduleDraw);
            window.removeEventListener('resize', scheduleDraw);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
            canvasRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, cellSize, lineColor, lineWidth]);

    return null; // this is a pure overlay: DOM appended directly to map container
}
