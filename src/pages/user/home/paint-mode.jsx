import Window from "@/components/ui/window";
import { uiActions } from "@/redux/slices/ui.slice";
import { useDispatch } from "react-redux";

function PaintMode() {
    const dispatch = useDispatch();

    function handeClosePaintMode() {
        dispatch(uiActions.setStates({ field: "paintMode", value: false }))
    }

    return (<Window sx={{ width: "100%" }} close={handeClosePaintMode}>Paint mode</Window>);
}

export default PaintMode;