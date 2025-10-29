import { SECTOR_SIZE } from "@/configs/env.config";
import { SectorDataParser } from "@/tools/data.tool";

let _sectorsCache = new Map();

export function useSectorsCache() {
    function get(sectorId) {
        return _sectorsCache.get(sectorId);
    }

    function getPixel(frame, pixelX, pixelY) {
        const sectorX = Math.floor(pixelX / SECTOR_SIZE);
        const sectorY = Math.floor(pixelY / SECTOR_SIZE);
        const x = Math.floor(pixelX % SECTOR_SIZE);
        const y = Math.floor(pixelY % SECTOR_SIZE);

        const sector = get(`${sectorX}:${sectorY}`);
        if (!sector) return null;
        const parser = new SectorDataParser(sector.frames, sector.accountLegend);
        return parser.getPixel(frame, x, y);
    }

    function set(sectorId, data) {
        _sectorsCache.set(sectorId, data);
    }

    function getAll() {
        return _sectorsCache;
    }

    return { get, set, getAll, getPixel };
}
