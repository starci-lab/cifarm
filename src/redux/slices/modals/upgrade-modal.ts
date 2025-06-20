import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UpgradeModalState {
  placedItemId?: string;
}

const initialState: UpgradeModalState = {}

export const upgradeModalSlice = createSlice({
    name: "upgradeModal",
    initialState,
    reducers: {
        setUpgradeModalContent: (
            state,
            action: PayloadAction<UpgradeModalState>
        ) => {
            state = action.payload
            return state
        },
    },
})

export const upgradeModalReducer = upgradeModalSlice.reducer
export const { setUpgradeModalContent } = upgradeModalSlice.actions
