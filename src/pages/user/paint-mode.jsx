import Window from "@/components/ui/window";
import { uiActions } from "@/redux/slices/ui.slice";
import { useDispatch } from "react-redux";
import { COLOR_PALETTE } from "@/configs/palette.config";
import { alpha, Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { useState, memo } from "react";
import { white } from "@/app/app/theme";
import Pixel from "@/components/ui/pixel";
import { useSelector } from "react-redux";
import { PAINT_TYPE } from "@/configs/const.config";
import { useMapEvents } from "react-leaflet";
import { Brush, Eraser, Scan } from 'lucide-react';

const Toolbar = memo(function Toolbar({ paintType, togglePaintType, bone, toggleBone }) {
    const isEraserActive = paintType === PAINT_TYPE.ERASER;
    const isBoneActive = bone;

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="end" p={1}>
            <Stack direction="row" spacing={2}>
                <IconButton
                    onClick={togglePaintType}
                    color={isEraserActive ? "primary" : "default"}
                    sx={isEraserActive ? { bgcolor: alpha(white, 0.2) } : {}}
                >
                    <Eraser />
                </IconButton>
                <IconButton
                    onClick={toggleBone}
                    color={isBoneActive ? "primary" : "default"}
                    sx={isBoneActive ? { bgcolor: alpha(white, 0.2) } : {}}
                >
                    <Scan />
                </IconButton>
            </Stack>
            <Button size="large" variant="outlined" endIcon={<Brush />}>Paint</Button>
            <span></span>
        </Stack>
    );
});
Toolbar.displayName = 'Toolbar';

const ColorPalette = memo(function ColorPalette({ selectedColor, setSelectedColor, paintType }) {
    const isDisabled = paintType === PAINT_TYPE.ERASER;

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(38px, 1fr))",
                gap: 0.5,
                p: 1,
                width: "100%",
                maxHeight: 300,
                overflowY: "auto",
                pointerEvents: isDisabled ? "none" : "auto",
                opacity: isDisabled ? 0.1 : 1,
            }}
        >
            {COLOR_PALETTE.map((item, index) => (
                <Tooltip key={index} title={`${item.name} : ${index}`} arrow placement="top">
                    <Box
                        role="button"
                        tabIndex={0}
                        onClick={() => !isDisabled && setSelectedColor(Number(index))}
                        sx={{
                            aspectRatio: "1",
                            backgroundColor: item.color,
                            borderRadius: 2,
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            border: `2px solid ${alpha(white, 0.5)}`,
                            transition: "transform 0.1s ease, box-shadow 0.2s",
                            "&:hover": {
                                transform: isDisabled ? "none" : "scale(0.9)",
                                zIndex: 2,
                            },
                            ...(selectedColor === index && {
                                outline: `4px solid ${white}`,
                            })
                        }}
                    />
                </Tooltip>
            ))}
        </Box>
    );
});
ColorPalette.displayName = 'ColorPalette';

const HighlightPixel = memo(function HighlightPixel({ highlight, selectedColor }) {
    return highlight ? (
        <Pixel
            x={highlight.x}
            y={highlight.y}
            opacity={0.5}
            {...(selectedColor && { c: COLOR_PALETTE[selectedColor].color })}
        />
    ) : null;
});
HighlightPixel.displayName = 'HighlightPixel';

const PaintedPixels = memo(function PaintedPixels({ paintingPixels, frame, bone }) {
    return Array.from(paintingPixels.values())
        .filter(p => Number(p.f) === frame)
        .map(p => {
            const { x, y, c, f } = p;
            return <Pixel key={`${x}:${y}:${f}`} x={x} y={y} c={COLOR_PALETTE[c].color} b={bone} />;
        });
});
PaintedPixels.displayName = 'PaintedPixels';

function PaintMode() {
    const dispatch = useDispatch();
    const [highlight, setHighlight] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [paintingPixels, setPaintingPixels] = useState(new Map());
    const [paintType, setPaintType] = useState(PAINT_TYPE.PAINT);
    const [bone, setBone] = useState(true);
    const { frame } = useSelector(s => s.animation);

    useMapEvents({
        click(e) {
            const x = Math.floor(e.latlng.lng);
            const y = Math.floor(e.latlng.lat);
            switch (paintType) {
                case PAINT_TYPE.PAINT: {
                    selectedColor && handlePaint(x, y);
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

    function handleClosePaintMode() {
        dispatch(uiActions.setStates({ field: "paintMode", value: false }));
    }

    return (
        <Window sx={{ width: "100%" }} close={handleClosePaintMode}>
            <Toolbar paintType={paintType} togglePaintType={togglePaintType} bone={bone} toggleBone={toggleBone} />
            <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} paintType={paintType} />
            <HighlightPixel highlight={highlight} selectedColor={selectedColor} />
            <PaintedPixels paintingPixels={paintingPixels} frame={frame} bone={bone} />
        </Window>
    );
}

export default PaintMode;