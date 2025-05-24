import { NFTType } from "@/modules/entities"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
    
export interface ConvertState {
    isConverting: boolean
    nftAddresses: Array<string>
    nftType: NFTType
    selectedNFTType: NFTType
}

const initialState: ConvertState = {
    isConverting: false,
    nftAddresses: [],
    nftType: NFTType.DragonFruit,
    selectedNFTType: NFTType.DragonFruit
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
        setNFTType: (state, action: PayloadAction<NFTType>) => {
            state.nftType = action.payload
        },
        setSelectedNFTType: (state, action: PayloadAction<NFTType>) => {
            state.selectedNFTType = action.payload
        },
    },
})

export const { setIsConverting, setNFTAddresses, setNFTType, setSelectedNFTType } = convertSlice.actions
export const convertReducer = convertSlice.reducer
