import { MAX_CACHE_SIZE } from "@/configs/const.config";
import { SECTOR_SIZE } from "@/configs/env.config";
import { SectorDataParser } from "@/tools/data.tool";

const _sectorsCache = new Map();
const _lruOrder = []; // Track order of sector access

export function useSectorsCache() {
    function get(sectorId) {
        const data = _sectorsCache.get(sectorId);
        if (data) {
            // Move to end of LRU list (most recently used)
            const index = _lruOrder.indexOf(sectorId);
            if (index > -1) {
                _lruOrder.splice(index, 1);
            }
            _lruOrder.push(sectorId);
        }
        return data;
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
        // Evict oldest item if cache is full
        if (_sectorsCache.size >= MAX_CACHE_SIZE && !_sectorsCache.has(sectorId)) {
            const oldestId = _lruOrder.shift(); // Remove from front (least recently used)
            if (oldestId) {
                _sectorsCache.delete(oldestId);
            }
        }

        _sectorsCache.set(sectorId, data);

        // Update LRU order
        const index = _lruOrder.indexOf(sectorId);
        if (index > -1) {
            _lruOrder.splice(index, 1);
        }
        _lruOrder.push(sectorId);
    }

    function del(sectorId) {
        if (_sectorsCache.has(sectorId)) {
            _sectorsCache.delete(sectorId);
            const index = _lruOrder.indexOf(sectorId);
            if (index > -1) {
                _lruOrder.splice(index, 1);
            }
            console.log(`Cache for sector ${sectorId} deleted.`);
            return true;
        }
        return false;
    }

    return { get, set, getPixel, del };
}
