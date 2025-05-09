
import { configureStore } from "@reduxjs/toolkit"
import {
    sessionReducer,
    hookDependencyReducer,
    tabReducer,
    settingsReducer,
    modalReducer,
    gameReducer,
    collapsibleReducer,
    wrapReducer,
    downloadReducer,
    searchReducer,
    sidebarReducer,
    sheetReducer
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
        wrapReducer,
        downloadReducer,
        searchReducer,
        sheetReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
