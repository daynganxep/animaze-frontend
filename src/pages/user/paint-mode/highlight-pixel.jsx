import { memo } from "react";
import Pixel from "@/components/ui/pixel";
import { COLOR_PALETTE } from "@/configs/palette.config";
import { PAINT_TYPE } from "@/configs/const.config";
import { white } from "@/app/app/theme";


export default memo(function HighlightPixel({ highlight, selectedColor, paintType }) {
    const isEraserActive = paintType === PAINT_TYPE.ERASER;

    if (!highlight) return null;

    if (isEraserActive) {
        return <Pixel
            x={highlight.x}
            y={highlight.y}
            c={white}
            b={false}
            opacity={0.75}
        />
    }

    return <Pixel
        x={highlight.x}
        y={highlight.y}
        opacity={0.75}
        c={COLOR_PALETTE[selectedColor]?.color}
    />;
});