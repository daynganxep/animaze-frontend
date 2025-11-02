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
import ImportFile from "./import-file";

export default memo(function Toolbar({ lastSelected, paintingPixels, paintType, togglePaintType, bone, toggleBone, handleClear }) {
    const { t } = useTranslation();
    const isEraserActive = paintType === PAINT_TYPE.ERASER;
    const isBoneActive = bone;
    const canPaintToServer = paintingPixels?.size > 0;
    const dispatch = useDispatch();

    const { mutate, isPending } = useMutation({
        mutationFn: SectorService.paint,
        onSuccess: (results) => {
            dispatch(uiActions.setStates({ field: "paintMode", value: false }))
            for (let result of results) {
                const [res, err] = result;
                if (err) {
                    toast.error(err.messageCode);
                } else {
                    toast.success(res.messageCode);
                }
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

    const handleUpdate = () => mutate(Array.from(paintingPixels.values()));


    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "end" }}
            spacing={{ xs: 1, sm: 0 }}
            p={1}
        >
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
                <ImportFile lastSelected={lastSelected} />
            </Stack>
            <Button
                loading={isPending}
                onClick={handleUpdate}
                disabled={!canPaintToServer}
                size="large"
                variant="outlined"
                endIcon={<Brush />}
                sx={{ fontWeight: "bold" }}
            >
                {t("ui.paint")} : {paintingPixels.size}
            </Button>
            <span></span>
        </Stack >
    );
});