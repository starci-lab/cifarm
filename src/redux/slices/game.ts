import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface GameSlice {
    visitedUserId?: string
    gameStarted: boolean
}

const initialState: GameSlice = {
    gameStarted: false,
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setVisitedUserId: (state, action: PayloadAction<string|undefined>) => {
            state.visitedUserId = action.payload
        },
        setGameStarted: (state, action: PayloadAction<boolean>) => {
            state.gameStarted = action.payload
        }
    },
})

export const gameReducer = gameSlice.reducer
export const { setVisitedUserId, setGameStarted } = gameSlice.actions
