import { Button, IconButton, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { Brush, BrushCleaning, Eraser, Scan } from "lucide-react";
import { memo } from "react";
import { PAINT_TYPE } from "@/configs/const.config";
import { useMutation } from "@tanstack/react-query";
import SectorService from "@/services/sector.service";
import toast from "@/hooks/toast";
import { useDispatch } from "react-redux";
import { uiActions } from "@/redux/slices/ui.slice";
import { useTranslation } from "react-i18next";

export default memo(function Toolbar({ paintingPixels, paintType, togglePaintType, bone, toggleBone, handleClear }) {
    const { t } = useTranslation();
    const isEraserActive = paintType === PAINT_TYPE.ERASER;
    const isBoneActive = bone;
    const canPaintToServer = paintingPixels?.size > 0;
    const dispatch = useDispatch();

    const { mutate, isPending } = useMutation({
        mutationFn: SectorService.paint,
        onSuccess: ([res, err]) => {
            if (err) {
                toast.error(err.messageCode);
            } else {
                toast.success(res.messageCode);
                dispatch(uiActions.setStates({ field: "paintMode", value: false }))
            }
        },
    });

    const sx = (x) => {
        return x ? {
            bgcolor: "background.black",
            color: "text.primary",
        } : {
            bgcolor: "background.light",
        }
    }

    const handleUpdate = () => {
        mutate({ pixels: Array.from(paintingPixels.values()) });
    };


    return (
        <Stack direction="row" justifyContent="space-between" alignItems="end" p={1} >
            <Stack direction="row" spacing={2}>
                <Tooltip arrow placement="top" title={t("ui.eraser")}>
                    <IconButton
                        sx={sx(isEraserActive)}
                        onClick={togglePaintType}
                    >
                        <Eraser />
                    </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title={t("ui.bone")}>
                    <IconButton
                        sx={sx(isBoneActive)}
                        onClick={toggleBone}
                    >
                        <Scan />
                    </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title={t("ui.clear")}>
                    <IconButton
                        disabled={paintingPixels.size == 0}
                        onClick={handleClear}
                    >
                        <BrushCleaning />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Button
                loading={isPending}
                onClick={handleUpdate}
                disabled={!canPaintToServer}
                size="large"
                variant="outlined"
                endIcon={<Brush />}
            >
                {t("ui.paint")} : {paintingPixels.size}
            </Button>
            <span></span>
        </Stack >
    );
});