import { ANIMATION_MODE } from "@/configs/const.config";
import { animationActions } from "@/redux/slices/animation.slice";
import { uiActions } from "@/redux/slices/ui.slice";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import L from "leaflet";
import { Palette } from "lucide-react";
import { useTranslation } from "react-i18next";

function PaintButton({ sx }) {
    const { t } = useTranslation();
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
        sx={{ flex: 1, borderRadius: 10, ...sx }}
        onClick={handeOpenPaintMode}
        endIcon={<Palette></Palette>}>
        {t("ui.paint")}
    </Button>);
}

export default PaintButton;