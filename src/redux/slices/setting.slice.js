import { createSlice } from "@reduxjs/toolkit";
import { getLS } from "@/tools/local-storage.tool";
import { THEMES } from "@/configs/const.config";

const settingSlice = createSlice({
    name: "setting",
    initialState: getLS("settings", { theme: THEMES.LIGHT }),
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        updateTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const settingActions = settingSlice.actions;
export const settingReducer = settingSlice.reducer;
