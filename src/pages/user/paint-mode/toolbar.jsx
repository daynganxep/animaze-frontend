import { Button, IconButton, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { Brush, Eraser, Scan } from "lucide-react";
import { memo } from "react";
import { PAINT_TYPE } from "@/configs/const.config";
import { useMutation } from "@tanstack/react-query";
import SectorService from "@/services/sector.service";
import toast from "@/hooks/toast";

export default memo(function Toolbar({ paintingPixels, paintType, togglePaintType, bone, toggleBone, }) {
    const isEraserActive = paintType === PAINT_TYPE.ERASER;
    const isBoneActive = bone;
    const canPaintToServer = paintingPixels?.size > 0;

    const { mutate, isPending } = useMutation({
        mutationFn: SectorService.paint,
        onError: () => {
            toast.success("PAINT FALSE");
        },
        onSuccess: () => {
            toast.success("PAINT SUCCESS");
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
                <Tooltip title="Eraser">
                    <IconButton
                        sx={sx(isEraserActive)}
                        onClick={togglePaintType}
                    >
                        <Eraser />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Bone pixel">
                    <IconButton
                        sx={sx(isBoneActive)}
                        onClick={toggleBone}
                    >
                        <Scan />
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
                Paint
            </Button>
            <span></span>
        </Stack >
    );
});