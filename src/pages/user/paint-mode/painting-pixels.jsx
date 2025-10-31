import { memo } from "react";
import Pixel from "@/components/ui/pixel";
import { COLOR_PALETTE } from "@/configs/palette.config";

export default memo(function PaintingPixels({ paintingPixels, frame, bone }) {
    return Array.from(paintingPixels.values())
        .filter(p => Number(p.f) === frame)
        .map(p => {
            const { x, y, c, f } = p;
            return <Pixel key={`${x}:${y}:${f}`} x={x} y={y} c={COLOR_PALETTE[c].color} b={bone} />;
        });
});