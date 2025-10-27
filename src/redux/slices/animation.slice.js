import { ANIMATION_MODE } from "@/configs/const.config";
import { getLS } from "@/tools/local-storage.tool";
import { setStates } from "@/tools/store.tool";
import { createSlice } from "@reduxjs/toolkit";

const initialState = getLS("animation", {
    mode: ANIMATION_MODE.ALL,
    staticFrame: 0,
    animationSpeed: 500,
});

const animationSlice = createSlice({
    name: "animation",
    initialState,
    reducers: {
        setStates: setStates(initialState)
    },
});

export const animationReducer = animationSlice.reducer;
export const animationActions = animationSlice.actions;
