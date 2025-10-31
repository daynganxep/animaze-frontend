import { uiActions } from "@/redux/slices/ui.slice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Window from "@/components/ui/window";
import { useMapEvents } from "react-leaflet";
import Toolbar from "./toolbar";
import ColorPalette from "./color-palette";
import HighlightPixel from "./highlight-pixel";
import PaintingPixels from "./painting-pixels";
import { PAINT_TYPE } from "@/configs/const.config";
import usePaintCursor from "./use-paint-cursor";

export default function PaintMode() {
    const dispatch = useDispatch();
    const [highlight, setHighlight] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [paintingPixels, setPaintingPixels] = useState(new Map());
    const [paintType, setPaintType] = useState(PAINT_TYPE.PAINT);
    const [bone, setBone] = useState(true);
    const { frame } = useSelector(s => s.animation);
    const [isSpaceDown, setIsSpaceDown] = useState(false);


    usePaintCursor(paintType);

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.code === "Space") {
                e.preventDefault();
                setIsSpaceDown(true);
            }
        }
        function handleKeyUp(e) {
            if (e.code === "Space") {
                e.preventDefault();
                setIsSpaceDown(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);


    useMapEvents({
        click(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            switch (paintType) {
                case PAINT_TYPE.PAINT: {
                    if (selectedColor !== null && selectedColor !== undefined) {
                        handlePaint(x, y);
                    }
                    break;
                }
                case PAINT_TYPE.ERASER: {
                    handleEraser(x, y);
                    break;
                }
            }
        },
        mousemove(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            setHighlight({ x, y });

            if (isSpaceDown) {
                switch (paintType) {
                    case PAINT_TYPE.PAINT: {
                        if (selectedColor !== null && selectedColor !== undefined) {
                            handlePaint(x, y);
                        }
                        break;
                    }
                    case PAINT_TYPE.ERASER: {
                        handleEraser(x, y);
                        break;
                    }
                }
            }
        },
        mouseout() {
            setHighlight(null);
        },
    });

    function togglePaintType() {
        setPaintType(paintType === PAINT_TYPE.ERASER ? PAINT_TYPE.PAINT : PAINT_TYPE.ERASER);
    }

    function toggleBone() {
        setBone(prev => !prev);
    }

    function handlePaint(x, y) {
        setPaintingPixels(prev => {
            const newMap = new Map(prev);
            newMap.set(`${x}:${y}:${frame}`, { x, y, c: selectedColor, f: frame });
            return newMap;
        });
    }

    function handleEraser(x, y) {
        setPaintingPixels(prev => {
            const newMap = new Map(prev);
            newMap.delete(`${x}:${y}:${frame}`);
            return newMap;
        });
    }

    function handleClear() {
        setPaintingPixels(new Map());
    }

    function handleClosePaintMode() {
        dispatch(uiActions.setStates({ field: "paintMode", value: false }));
    }

    return (
        <Window sx={{ width: "100%" }} close={handleClosePaintMode}>
            <Toolbar paintingPixels={paintingPixels} handleClear={handleClear} paintType={paintType} togglePaintType={togglePaintType} bone={bone} toggleBone={toggleBone} />
            <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} paintType={paintType} />
            <PaintingPixels paintingPixels={paintingPixels} frame={frame} bone={bone} />
            <HighlightPixel highlight={highlight} selectedColor={selectedColor} paintType={paintType} />
        </Window>
    );
}
