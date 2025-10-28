import { ANIMATION_MODE } from "@/configs/const.config";
import { setStates } from "@/tools/store.tool";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: ANIMATION_MODE.DYNAMIC,
    frame: 0,
    speed: 500,
};

const animationSlice = createSlice({
    name: "animation",
    initialState,
    reducers: {
        setStates: setStates(initialState)
    },
});

export const animationReducer = animationSlice.reducer;
export const animationActions = animationSlice.actions;
