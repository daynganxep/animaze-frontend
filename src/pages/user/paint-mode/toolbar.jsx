import { PAINT_TYPE } from "@/configs/const.config";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { Brush, Eraser, Scan } from "lucide-react";
import { memo } from "react";

export default memo(function Toolbar({ paintType, togglePaintType, bone, toggleBone }) {
    const isEraserActive = paintType === PAINT_TYPE.ERASER;
    const isBoneActive = bone;

    const sx = (x) => {
        return x ? {
            bgcolor: "background.black",
            color: "text.primary",
        } : {
            bgcolor: "background.light",
        }
    }


    return (
        <Stack direction="row" justifyContent="space-between" alignItems="end" p={1}>
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
            <Button size="large" variant="outlined" endIcon={<Brush />}>Paint</Button>
            <span></span>
        </Stack>
    );
});