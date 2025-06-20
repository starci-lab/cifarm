import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SellModalState {
  placedItemId?: string;
}

const initialState: SellModalState = {}

export const sellModalSlice = createSlice({
    name: "sellModal",
    initialState,
    reducers: {
        setSellModalContent: (state, action: PayloadAction<SellModalState>) => {
            state = action.payload
            return state
        },
    },
}) 

export const sellModalReducer = sellModalSlice.reducer
export const { setSellModalContent } = sellModalSlice.actions
