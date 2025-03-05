import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface GameSlice {
    visitedUserId?: string
}

const initialState: GameSlice = {
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setVisitedUserId: (state, action: PayloadAction<string|undefined>) => {
            state.visitedUserId = action.payload
        },
    },
})

export const gameReducer = gameSlice.reducer
export const { setVisitedUserId } = gameSlice.actions
