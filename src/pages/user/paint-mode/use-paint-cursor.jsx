import { PAINT_TYPE } from "@/configs/const.config";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function usePaintCursor(paintType) {
    const map = useMap();

    useEffect(() => {
        const container = map.getContainer();
        if (paintType === PAINT_TYPE.ERASER) {
            container.style.cursor = `url('/src/assets/images/eraser.svg') 4 28, auto`;
        } else {
            container.style.cursor = 'crosshair';
        }
    }, [paintType, map]);
}
