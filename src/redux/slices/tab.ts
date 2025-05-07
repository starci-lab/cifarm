import { createSlice } from "@reduxjs/toolkit"

export enum AssetTab {
    Tokens = "tokens",
    NFTs = "nfts",
    InGame = "in-game",
}

export enum TransferTab {
    Token = "token",
    NFT = "nft",
}

export enum NeighborsTab {
    Neighbors = "neighbors",
    Followees = "followees",
}

export enum QuestsTab {
    Game = "game",
    Daily = "daily",
    Social = "social",
    Partnership = "partnership",
}


export enum ShopTab {
    Seeds = "Seeds",
    Flowers = "Flowers",
    Animals = "Animals",
    Buildings = "Buildings",
    Fruits = "Fruits",
    Tiles = "Tiles",
    Supplies = "Supplies",
    Tools = "Tools",
    Pets = "Pets",
    Decorations = "Decorations",
}


export interface TabSlice {
    assetTab: AssetTab
    transferTab: TransferTab
    neighborsTab: NeighborsTab
    questsTab: QuestsTab
    shopTab: ShopTab
}

const initialState: TabSlice = {
    assetTab: AssetTab.Tokens,
    transferTab: TransferTab.Token,
    neighborsTab: NeighborsTab.Neighbors,
    questsTab: QuestsTab.Social,
    shopTab: ShopTab.Seeds,
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
        setNeighborsTab: (state, action) => {
            state.neighborsTab = action.payload
        },
        setQuestsTab: (state, action) => {
            state.questsTab = action.payload
        },
        setShopTab: (state, action) => {
            state.shopTab = action.payload
        },
    },
})

export const tabReducer = tabSlice.reducer
export const { setAssetTab, setTransferTab, setNeighborsTab, setQuestsTab, setShopTab } = tabSlice.actions
