import { COLOR_PALETTE } from "@/configs/palette.config";

export function findColorIndex(c) {
    const paletteIndex = COLOR_PALETTE
        .findIndex(cp => (`Wplace ${cp.name}`.toLowerCase() === c.toLowerCase()) || cp.name.toLowerCase() === c.toLowerCase() || cp.color.toLowerCase() === c.toLowerCase());
    return paletteIndex !== -1 ? paletteIndex : 0;
}

export function processBlueprint({ x, y, f, pixels = [] }) {
    return pixels.map(p => ({
        x: x + p.x,
        y: y + p.y,
        f,
        c: findColorIndex(p.c),
    }))
}