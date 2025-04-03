
import { configureStore } from "@reduxjs/toolkit"
import {
    sessionReducer,
    hookDependencyReducer,
    tabReducer,
    settingsReducer,
    modalReducer,
    gameReducer,
    collapsibleReducer
} from "./slices"

export const store = configureStore({
    reducer: {
        sessionReducer,
        hookDependencyReducer,
        tabReducer,
        settingsReducer,
        modalReducer,
        gameReducer,
        collapsibleReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
