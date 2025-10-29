import { ANIMATION_MODE } from "@/configs/const.config";
import { animationActions } from "@/redux/slices/animation.slice";
import { uiActions } from "@/redux/slices/ui.slice";
import { ColorLens } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import L from "leaflet";

function PaintButton() {
    const dispatch = useDispatch();
    const { logged } = useSelector(s => s.auth);

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
    }, []);

    function handeOpenPaintMode() {
        if (logged) {
            dispatch(uiActions.setStates({ field: "paintMode", value: true }));
            dispatch(animationActions.setStates({ field: "mode", value: ANIMATION_MODE.STATIC }));
        } else {
            dispatch(uiActions.setStates({ field: "signInDialog", value: true }))
        }
    }

    return (<Button
        ref={ref}
        variant="outlined"
        size="large"
        sx={{ width: "100%", maxWidth: "300px", borderRadius: 10 }}
        onClick={handeOpenPaintMode}
        endIcon={<ColorLens></ColorLens>}>
        Paint
    </Button>);
}

export default PaintButton;