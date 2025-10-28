import L from 'leaflet';
import { SECTOR_SIZE } from '@/tools/data.tool';
import { WORLD_DIMENSION } from '@/configs/env.config';

export function screenToWorld(screenPoint, mapInstance) {
    const [screenX, screenY] = screenPoint;
    const latLng = mapInstance.containerPointToLatLng(L.point(screenX, screenY));
    const worldX = Math.floor(latLng.lng);
    const worldY = Math.floor(latLng.lat);
    return [
        Math.max(0, Math.min(WORLD_DIMENSION - 1, worldX)),
        Math.max(0, Math.min(WORLD_DIMENSION - 1, worldY))
    ];
}

export function worldToScreen(worldPoint, mapInstance) {
    const [worldX, worldY] = worldPoint;
    const point = mapInstance.latLngToContainerPoint(L.latLng(worldY, worldX));
    return [Math.round(point.x), Math.round(point.y)];
}

export function worldToSector(worldPoint) {
    const [worldX, worldY] = worldPoint;
    const sectorX = Math.floor(worldX / SECTOR_SIZE);
    const sectorY = Math.floor(worldY / SECTOR_SIZE);
    return [sectorX, sectorY];
}

export function sectorToWorld(sectorPoint) {
    const [sectorX, sectorY] = sectorPoint;
    const worldX = sectorX * SECTOR_SIZE;
    const worldY = sectorY * SECTOR_SIZE;
    return [worldX, worldY];
}
