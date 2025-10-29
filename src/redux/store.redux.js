import { configureStore } from "@reduxjs/toolkit";
import { setLS } from "@/tools/local-storage.tool";

import { authReducer } from "./slices/auth.slice";
import { uiReducer } from "./slices/ui.slice";
import { animationReducer } from "./slices/animation.slice";

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    setLS("auth", state.auth);
    return result;
};

export default configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        animation: animationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});
