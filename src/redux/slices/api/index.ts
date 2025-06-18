import { combineReducers } from "@reduxjs/toolkit"
import { coreApiReducer } from "./core-api"

export * from "./core-api"

export const apiReducer = combineReducers({
    coreApi: coreApiReducer,
})
