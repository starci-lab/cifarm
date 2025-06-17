import { NFTRarityEnum, NFTCollectionKey } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface NFTItem {
    nftCollectionKey: NFTCollectionKey;
    rarity: NFTRarityEnum;
    nftName: string;
    }
  
export interface NFTsClaimedModalState {
    nftItems: Array<NFTItem>
}

const initialState: NFTsClaimedModalState = {
    nftItems: []
}

export const nftsClaimedModalSlice = createSlice({
    name: "nftsClaimedModal",
    initialState,
    reducers: {
        setNFTsClaimedModalContent: (state, action: PayloadAction<NFTsClaimedModalState>) => {
            state.nftItems = action.payload.nftItems
        }
    }
})  

export const { setNFTsClaimedModalContent } = nftsClaimedModalSlice.actions
export const nftsClaimedModalReducer = nftsClaimedModalSlice.reducer