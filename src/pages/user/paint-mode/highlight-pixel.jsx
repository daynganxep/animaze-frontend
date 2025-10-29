import { memo } from "react";
import Pixel from "@/components/ui/pixel";
import { COLOR_PALETTE } from "@/configs/palette.config";


export default memo(function HighlightPixel({ highlight, selectedColor }) {
    return highlight ? (
        <Pixel
            x={highlight.x}
            y={highlight.y}
            opacity={0.5}
            {...(selectedColor && { c: COLOR_PALETTE[selectedColor].color })}
        />
    ) : null;
});