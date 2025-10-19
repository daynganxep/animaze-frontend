import { createSlice } from "@reduxjs/toolkit";
import { getLS } from "@/tools/local-storage.tool";
import { setStates } from "@/tools/store.tool";


const initialState = getLS("auth", {
    tokens: { accessToken: "", refreshToken: "" },
    account: null,
    isLoging: false,
    redirect: "/",
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setStates: setStates(initialState)
    },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;