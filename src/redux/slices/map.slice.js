import { createSlice } from "@reduxjs/toolkit";
import { getLS } from "@/tools/local-storage.tool";
import { setStates } from "@/tools/store.tool";
import { set } from "lodash";

const initialState = getLS("map", { x: 0, y: 0, z: 0, f: 0 });

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setStates: setStates(initialState),
        set: function (state, { payload }) {
            const { x, y, z, f } = payload;
            set(state, "x", x);
            set(state, "y", y);
            set(state, "z", z);
            set(state, "f", f);
        }
    },
});

export const mapActions = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
