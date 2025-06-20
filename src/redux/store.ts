
import { configureStore } from "@reduxjs/toolkit"
import {
    sessionReducer,
    hookDependencyReducer,
    tabReducer,
    settingsReducer,
    gameReducer,
    collapsibleReducer,
    wsLoadStateReducer,
    // downloadReducer,
    // searchReducer,
    sidebarReducer,
    sheetsReducer,
    convertReducer,
    tutorialReducer,
    selectionReducer,
    walletReducer,
    modalReducer,
    apiReducer,
    gameplayReducer,
    swrsReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        sessionReducer,
        hookDependencyReducer,
        tabReducer,
        settingsReducer,
        gameReducer,
        collapsibleReducer,
        sidebarReducer,
        // downloadReducer,
        // searchReducer,
        sheetsReducer,
        convertReducer,
        tutorialReducer,
        wsLoadStateReducer,
        selectionReducer,
        modalReducer,
        apiReducer,
        walletReducer,
        gameplayReducer,
        swrsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
