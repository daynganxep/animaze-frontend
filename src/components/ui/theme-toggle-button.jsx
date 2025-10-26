import { useDispatch, useSelector } from "react-redux";
import { settingActions } from "@/redux/slices/setting.slice";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { THEMES } from "@/configs/const.config";

const ThemeToggleButton = () => {
    const { theme: mode } = useSelector((state) => state.setting);
    const dispatch = useDispatch();

    return (
        <Tooltip title={mode === THEMES.LIGHT ? "Switch to Dark Mode" : "Switch to Light Mode"}>
            <IconButton onClick={() => dispatch(settingActions.toggleTheme())} color="inherit">
                {mode === THEMES.LIGHT ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggleButton;