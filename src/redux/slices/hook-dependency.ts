import { createSlice } from "@reduxjs/toolkit"

export interface HookDependencySlice {
  loadAccountsKey: number;
  loadTokensKey: number;
  loadNFTCollectionsKey: number;
  startAppKey: number;
  refreshAddressesKey: number;
}

const initialState: HookDependencySlice = {
    loadAccountsKey: 0,
    loadTokensKey: 0,
    loadNFTCollectionsKey: 0,
    startAppKey: 0,
    refreshAddressesKey: 0,
}

export const hookDependencySlice = createSlice({
    name: "hookDependency",
    initialState,
    reducers: {
        triggerLoadAccounts: (state) => {
            state.loadAccountsKey += 1
        },
        triggerLoadTokens: (state) => {
            state.loadTokensKey += 1
        },
        triggerLoadNFTCollections: (state) => {
            state.loadNFTCollectionsKey += 1
        },
        triggerStartApp: (state) => {
            state.startAppKey += 1
        },
        triggerRefreshAddresses: (state) => {
            state.refreshAddressesKey += 1
        }
    },
})

export const hookDependencyReducer = hookDependencySlice.reducer
export const { triggerLoadAccounts, triggerLoadTokens, triggerLoadNFTCollections, triggerStartApp, triggerRefreshAddresses } = hookDependencySlice.actions
