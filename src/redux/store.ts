
import { configureStore } from "@reduxjs/toolkit"
import {
    sessionReducer,
    hookDependencyReducer
} from "./slices"

export const store = configureStore({
    reducer: {
        sessionReducer,
        hookDependencyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
