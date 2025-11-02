import { createSlice } from "@reduxjs/toolkit";
import { setStates } from "@/tools/store.tool";

const initialState = { paintMode: false, signInDialog: false, update: null };

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setStates: setStates(initialState),
        forceUpdate: (state) => {
            state.update = (new Date()).toISOString()
        }
    },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
