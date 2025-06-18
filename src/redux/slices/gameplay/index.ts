import { combineReducers } from "@reduxjs/toolkit"
import { gameplaySelectionReducer } from "./gameplay-selection"
import { gameplayContextReducer } from "./gameplay-context"

export * from "./gameplay-selection"
export * from "./gameplay-context"

export const gameplayReducer = combineReducers({
    gameplaySelection: gameplaySelectionReducer,
    gameplayContext: gameplayContextReducer,
})  