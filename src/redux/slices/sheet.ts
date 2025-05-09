import { TokenKey } from "@/modules/entities"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TokenSheet {
    tokenKey?: TokenKey;
}

export interface SheetSlice {
  tokenSheet: TokenSheet;
}

const initialState: SheetSlice = {
    tokenSheet: {},
}

export const sheetSlice = createSlice({
    name: "sheet",
    initialState,
    reducers: {
        setTokenSheet: (state, action: PayloadAction<TokenSheet>) => {
            state.tokenSheet = action.payload
        },
    },
})

export const sheetReducer = sheetSlice.reducer
export const {
    setTokenSheet,
} = sheetSlice.actions
