import { white } from "@/app/app/theme";
import { PAINT_TYPE } from "@/configs/const.config";
import { alpha, Button, IconButton, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { Brush, Eraser, Scan } from "lucide-react";
import { memo } from "react";

export default memo(function Toolbar({ paintType, togglePaintType, bone, toggleBone }) {
    const isEraserActive = paintType === PAINT_TYPE.ERASER;
    const isBoneActive = bone;

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="end" p={1}>
            <Stack direction="row" spacing={2}>
                <Tooltip title="Eraser">
                    <IconButton
                        onClick={togglePaintType}
                        color={isEraserActive ? "primary" : "default"}
                        sx={isEraserActive ? { bgcolor: alpha(white, 0.2) } : {}}
                    >
                        <Eraser />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Bone pixel">
                    <IconButton
                        onClick={toggleBone}
                        color={isBoneActive ? "primary" : "default"}
                        sx={isBoneActive ? { bgcolor: alpha(white, 0.2) } : {}}
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