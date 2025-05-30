
import { configureStore } from "@reduxjs/toolkit"
import {
    sessionReducer,
    hookDependencyReducer,
    tabReducer,
    settingsReducer,
    modalReducer,
    gameReducer,
    collapsibleReducer,
    wsLoadStateReducer,
    downloadReducer,
    searchReducer,
    sidebarReducer,
    sheetReducer,
    convertReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        sessionReducer,
        hookDependencyReducer,
        tabReducer,
        settingsReducer,
        modalReducer,
        gameReducer,
        collapsibleReducer,
        sidebarReducer,
        downloadReducer,
        searchReducer,
        sheetReducer,
        convertReducer,
        wsLoadStateReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
