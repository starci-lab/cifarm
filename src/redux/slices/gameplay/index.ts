import { combineReducers } from "@reduxjs/toolkit"
import { gameplaySelectionReducer } from "./gameplay-selection"

export const gameplayReducer = combineReducers({
    gameplaySelection: gameplaySelectionReducer,
})  