import { TokenKey } from "@/modules/entities"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TokenSheet {
    tokenKey?: TokenKey;
}

export interface NFTSheet {
    nftAddress?: string;
}

export interface GameItemSheet {
    gameItemKey?: string;
}

export interface BottomNavSheet {
    items?: BottomNavSheetData[];
}

export interface BottomNavSheetData {
    name: string;
    icon: React.ElementType;
    path: string;
}

export enum NFTSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

export enum TokenSheetPage {
    Main = "Main",
    Transfer = "Transfer",
}

export interface SheetSlice {
  tokenSheet: TokenSheet;
  nftSheet: NFTSheet;
  gameItemSheet: GameItemSheet;
  bottomNavSheet: BottomNavSheet;
  tokenSheetPage: TokenSheetPage;
  nftSheetPage: NFTSheetPage;
}

const initialState: SheetSlice = {
    tokenSheet: {},
    nftSheet: {},
    gameItemSheet: {},
    bottomNavSheet: {},
    tokenSheetPage: TokenSheetPage.Main,
    nftSheetPage: NFTSheetPage.Main,
}

export const sheetSlice = createSlice({
    name: "sheet",
    initialState,
    reducers: {
        setTokenSheet: (state, action: PayloadAction<TokenSheet>) => {
            state.tokenSheet = action.payload
        },
        setNFTSheet: (state, action: PayloadAction<NFTSheet>) => {
            state.nftSheet = action.payload
        },
        setTokenSheetPage: (state, action: PayloadAction<TokenSheetPage>) => {
            state.tokenSheetPage = action.payload
        },
        setNFTSheetPage: (state, action: PayloadAction<NFTSheetPage>) => {
            state.nftSheetPage = action.payload
        },
        setGameItemSheet: (state, action: PayloadAction<GameItemSheet>) => {
            state.gameItemSheet = action.payload
        },
        setBottomNavSheet: (state, action: PayloadAction<BottomNavSheet>) => {
            state.bottomNavSheet = action.payload
        },
    },
})

export const sheetReducer = sheetSlice.reducer
export const {
    setTokenSheet,
    setNFTSheet,
    setTokenSheetPage,
    setNFTSheetPage,
    setGameItemSheet,
    setBottomNavSheet,
} = sheetSlice.actions


