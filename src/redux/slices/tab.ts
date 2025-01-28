import { createSlice } from "@reduxjs/toolkit"

export enum AssetTab {
    Tokens = "tokens",
    NFTs = "nfts",
    InGameItems = "inGameItems",
}
export interface TabSlice {
    assetTab: AssetTab
}

const initialState: TabSlice = {
    assetTab: AssetTab.Tokens,
}

export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setAssetTab: (state, action) => {
            state.assetTab = action.payload
        },
    },
})

export const tabReducer = tabSlice.reducer
export const { setAssetTab } = tabSlice.actions
