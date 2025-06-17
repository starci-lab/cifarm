import { NFTCollectionKey } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
    
export interface ConvertState {
    isConverting: boolean
    nftAddresses: Array<string>
    nftCollectionKey: NFTCollectionKey
    selectedNFTCollectionKey: NFTCollectionKey
}

const initialState: ConvertState = {
    isConverting: false,
    nftAddresses: [],
    nftCollectionKey: NFTCollectionKey.DragonFruit,
    selectedNFTCollectionKey: NFTCollectionKey.DragonFruit
}

export const convertSlice = createSlice({
    name: "convert",
    initialState,
    reducers: {
        setIsConverting: (state, action: PayloadAction<boolean>) => {
            state.isConverting = action.payload
        },
        setNFTAddresses: (state, action: PayloadAction<Array<string>>) => {
            state.nftAddresses = action.payload
        },
        setNFTCollectionKey: (state, action: PayloadAction<NFTCollectionKey>) => {
            state.nftCollectionKey = action.payload
        },
        setSelectedNFTCollectionKey: (state, action: PayloadAction<NFTCollectionKey>) => {
            state.selectedNFTCollectionKey = action.payload
        },
    },
})

export const { setIsConverting, setNFTAddresses, setNFTCollectionKey, setSelectedNFTCollectionKey } = convertSlice.actions
export const convertReducer = convertSlice.reducer
