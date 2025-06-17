import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InventoryModalState {
    selectedInventoryId?: string
}

const initialState: InventoryModalState = {
    selectedInventoryId: undefined
}

export const inventoryModalSlice = createSlice({
    name: "inventoryModal",
    initialState,
    reducers: {
        setSelectedInventoryId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedInventoryId = action.payload
        }
    }
})

export const inventoryModalReducer = inventoryModalSlice.reducer
export const { setSelectedInventoryId } = inventoryModalSlice.actions