import { createSlice } from "@reduxjs/toolkit"

export enum AssetTab {
    Profile = "profile",
    OnChainAssets = "on-chain-assets",
    GameAssets = "game-assets",
}
export interface TabSlice {
    assetTab: AssetTab
}

const initialState: TabSlice = {
    assetTab: AssetTab.Profile,
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
