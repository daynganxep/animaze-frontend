import { ANIMATION_MODE } from "@/configs/const.config";
import { animationActions } from "@/redux/slices/animation.slice";
import { uiActions } from "@/redux/slices/ui.slice";
import { ColorLens } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

function PaintButton() {
    const dispatch = useDispatch();

    function handeOpenPaintMode() {
        dispatch(uiActions.setStates({ field: "paintMode", value: true }));
        dispatch(animationActions.setStates({ field: "mode", value: ANIMATION_MODE.STATIC }));
    }

    return (<Button
        variant="outlined"
        size="large"
        sx={{ width: "100%", maxWidth: "300px", borderRadius: 10 }}
        onClick={handeOpenPaintMode}
        endIcon={<ColorLens></ColorLens>}>
        Paint
    </Button>);
}

export default PaintButton;