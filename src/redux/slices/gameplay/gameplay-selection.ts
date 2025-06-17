// slice for selection of inventories, products, etc, ...
// store all the selection state here
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface GameplaySelectionSlice {
    // selected placed item id
    selectedPlacedItemId?: string
}

const initialState: GameplaySelectionSlice = {}

export const gameplaySelectionSlice = createSlice({
    name: "gameplaySelection",
    initialState,
    reducers: {
        setSelectedPlacedItemId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedPlacedItemId = action.payload
        },
    },
})

export const gameplaySelectionReducer = gameplaySelectionSlice.reducer
export const { setSelectedPlacedItemId } = gameplaySelectionSlice.actions
