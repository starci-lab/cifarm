import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WholesaleMarketBulkSheetState {
  bulkId?: string;
}

const initialState: WholesaleMarketBulkSheetState = {}

export const wholesaleMarketBulkSheetSlice = createSlice({
    name: "wholesaleMarketBulkSheet",
    initialState,
    reducers: {
        setWholesaleMarketBulkSheetContent: (
            state,
            action: PayloadAction<WholesaleMarketBulkSheetState>
        ) => {
            state = action.payload
            return state
        },
    },
})

export const wholesaleMarketBulkSheetReducer =
  wholesaleMarketBulkSheetSlice.reducer
export const { setWholesaleMarketBulkSheetContent } =
  wholesaleMarketBulkSheetSlice.actions
