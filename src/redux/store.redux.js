import { configureStore } from "@reduxjs/toolkit";
import { setLS } from "@/tools/local-storage.tool";

import { authReducer } from "./slices/auth.slice";
import { uiReducer } from "./slices/ui.slice";
import { animationReducer } from "./slices/animation.slice";
import { mapReducer } from "./slices/map.slice";


const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    setLS("auth", state.auth);
    setLS("map", state.map);
    return result;
};

export default configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        animation: animationReducer,
        map: mapReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});
