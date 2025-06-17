// slice for selection of inventories, products, etc, ...
// store all the selection state here
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SelectionSlice {
    // selected delivery inventory ids
    selectedDeliveryInventoryIds: Array<string>;
    // selected retrieve inventory ids
    selectedRetrieveInventoryIds: Array<string>;
    // slots left for delivery inventory
    slotsDeliveryInventoryLeft: number;
    // slots left for storage inventory
    slotsStorageInventoryLeft: number;
    // selected ship product id
    selectedShipProductId?: string;
    // selected ship inventory id
    selectedShipInventoryId?: string;
}

const initialState: SelectionSlice = {
    selectedDeliveryInventoryIds: [],
    selectedRetrieveInventoryIds: [],
    slotsDeliveryInventoryLeft: 0,
    slotsStorageInventoryLeft: 0,
}

export const selectionSlice = createSlice({
    name: "selection",
    initialState,
    reducers: {
        setSelectedDeliveryInventoryIds: (state, action: PayloadAction<Array<string>>) => {
            state.selectedDeliveryInventoryIds = action.payload
        },
        setSelectedRetrieveInventoryIds: (state, action: PayloadAction<Array<string>>) => {
            state.selectedRetrieveInventoryIds = action.payload
        },
        setSlotsDeliveryInventoryLeft: (state, action: PayloadAction<number>) => {
            state.slotsDeliveryInventoryLeft = action.payload
        },
        setSlotsStorageInventoryLeft: (state, action: PayloadAction<number>) => {
            state.slotsStorageInventoryLeft = action.payload
        },
        setSelectedShipProductId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedShipProductId = action.payload
        },
        setSelectedShipInventoryId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedShipInventoryId = action.payload
        }
    },
})

export const selectionReducer = selectionSlice.reducer
export const { 
    setSelectedDeliveryInventoryIds, 
    setSelectedRetrieveInventoryIds,
    setSlotsDeliveryInventoryLeft,
    setSlotsStorageInventoryLeft,
    setSelectedShipProductId,
    setSelectedShipInventoryId
} = selectionSlice.actions
