import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface BottomNavSheetState {
    dump: string
}

const initialState: BottomNavSheetState = {
    dump: "dump"
}

export const bottomNavSheetSlice = createSlice({
    name: "bottomNavSheet",
    initialState,
    reducers: {
        setDump: (state, action: PayloadAction<string>) => {
            state.dump = action.payload
        }
    }
})

export const bottomNavSheetReducer = bottomNavSheetSlice.reducer
export const { setDump } = bottomNavSheetSlice.actions