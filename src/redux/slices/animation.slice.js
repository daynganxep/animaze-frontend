import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'ALL', // 'ALL', 'STATIC', 'REGION'
    staticFrame: 0, // 0-3
    animationSpeed: 500, // milliseconds per frame
};

const animationSlice = createSlice({
    name: "animation",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setStaticFrame: (state, action) => {
            state.staticFrame = action.payload;
        },
        setAnimationSpeed: (state, action) => {
            state.animationSpeed = action.payload;
        },
    },
});

export const animationReducer = animationSlice.reducer;
export const animationActions = animationSlice.actions;
