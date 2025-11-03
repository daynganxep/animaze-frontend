import { createSlice } from "@reduxjs/toolkit";
import { setStates } from "@/tools/store.tool";

const initialState = {
    paintMode: false,
    signInDialog: false,
    rerender: null
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setStates: setStates(initialState),
        triggerRerender: (state, { payload }) => {
            state.rerender = { sectorId: payload, timestampes: (new Date()).toISOString() };
        }
    }
})

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer; 