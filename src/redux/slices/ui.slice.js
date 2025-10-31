import { createSlice } from "@reduxjs/toolkit";
import { getLS } from "@/tools/local-storage.tool";
import { setStates } from "@/tools/store.tool";

const initialState = getLS("ui", { paintMode: false, signInDialog: false });

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setStates: setStates(initialState)
    },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
