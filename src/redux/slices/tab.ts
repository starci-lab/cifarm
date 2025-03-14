import { createSlice } from "@reduxjs/toolkit"

export enum AssetTab {
    Profile = "profile",
    OnChainAssets = "on-chain-assets",
    GameAssets = "game-assets",
}

export enum TransferTab {
    Token = "token",
    NFTs = "nfts",
}

export interface TabSlice {
    assetTab: AssetTab
    transferTab: TransferTab
}

const initialState: TabSlice = {
    assetTab: AssetTab.Profile,
    transferTab: TransferTab.Token,
}

export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setAssetTab: (state, action) => {
            state.assetTab = action.payload
        },
        setTransferTab: (state, action) => {
            state.transferTab = action.payload
        },
    },
})

export const tabReducer = tabSlice.reducer
export const { setAssetTab, setTransferTab } = tabSlice.actions
