import { ChainKey } from "@/modules/blockchain"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum SidebarTab {
    Home = "home",
    Assets = "assets",
    DApps = "dapps",
}
export interface SidebarSlice {
    tab: SidebarTab;
    assetsChainKey: ChainKey;
}

const initialState: SidebarSlice = {
    tab: SidebarTab.Home,
    assetsChainKey: ChainKey.Solana,
}

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebarTab: (state, action: PayloadAction<SidebarTab>) => {
            state.tab = action.payload
        },
        setAssetsChainKey: (state, action: PayloadAction<ChainKey>) => {
            state.assetsChainKey = action.payload
        },
    },
})

export const sidebarReducer = sidebarSlice.reducer
export const { setSidebarTab, setAssetsChainKey } = sidebarSlice.actions
