import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SWRResponse } from "swr"
import { BlockchainBalanceData, BlockchainCollectionData } from "@/modules/apollo"
    
export interface WrapperBlockchainCollectionData {
    collection: BlockchainCollectionData
    cached: boolean
    refreshInterval: number
}

export interface WrapperBlockchainBalanceData {
    balance: BlockchainBalanceData
    cached: boolean
    refreshInterval: number
}

export interface SWRsState {
  balanceSwrs: Record<string, SWRResponse<WrapperBlockchainBalanceData>>;
  nftCollectionSwrs: Record<string, SWRResponse<WrapperBlockchainCollectionData>>;
}

const initialState: SWRsState = {
    balanceSwrs: {},
    nftCollectionSwrs: {},
}

// swrs slice
export const swrsSlice = createSlice({
    name: "swrs",
    initialState,
    reducers: {
        setBalanceSwr: (state, action: PayloadAction<SetBalanceSwrParams>) => {
            const { tokenKey, swr } = action.payload
            state.balanceSwrs[tokenKey] = swr
        },
        removeBalanceSwr: (state, action: PayloadAction<string>) => {
            delete state.balanceSwrs[action.payload]
        },
        setNFTCollectionsSwr: (
            state,
            action: PayloadAction<SetNFTCollectionsSwrParams>
        ) => {
            const { collectionKey, swr } = action.payload
            state.nftCollectionSwrs[collectionKey] = swr
        },
        removeNFTCollectionsSwr: (state, action: PayloadAction<string>) => {
            delete state.nftCollectionSwrs[action.payload]
        },
    },
})

export const swrsReducer = swrsSlice.reducer
export const {
    setBalanceSwr,
    removeBalanceSwr,
    setNFTCollectionsSwr,
    removeNFTCollectionsSwr,
} = swrsSlice.actions

export interface SetBalanceSwrParams {
  tokenKey: string;
  swr: SWRResponse<WrapperBlockchainBalanceData>;
}

export interface SetNFTCollectionsSwrParams {
  collectionKey: string;
  swr: SWRResponse<WrapperBlockchainCollectionData>;
}
