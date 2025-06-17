import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ShipModalState {
  selectedShipInventoryId?: string;
}

const initialState: ShipModalState = {}

export const shipModalSlice = createSlice({
    name: "shipModal",
    initialState,
    reducers: {
        setShipModalContent: (state, action: PayloadAction<ShipModalState>) => {
            state = action.payload
        },
    },
})

export const shipModalReducer = shipModalSlice.reducer
export const { setShipModalContent } = shipModalSlice.actions
