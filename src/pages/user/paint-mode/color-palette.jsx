import { alpha, Box, Tooltip } from "@mui/material";
import { memo } from "react";
import { white } from "@/app/app/theme";
import { COLOR_PALETTE } from "@/configs/palette.config";
import { PAINT_TYPE } from "@/configs/const.config";
import { useTranslation } from "react-i18next";

export default memo(function ColorPalette({ selectedColor, setSelectedColor, paintType }) {
    const isDisabled = paintType === PAINT_TYPE.ERASER;
    const { t } = useTranslation();

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
                <Tooltip key={index} title={`${t("palette." + item.name)} : ${index}`} arrow placement="top">
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