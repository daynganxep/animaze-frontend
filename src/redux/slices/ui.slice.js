import { createSlice } from "@reduxjs/toolkit";
import { setStates } from "@/tools/store.tool";

const initialState = { paintMode: false, signInDialog: false, updatedSector: null };

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setStates: setStates(initialState),
        forceUpdate: (state, { payload }) => {
            state.updatedSector = { sectorId: payload };
        }
    },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
