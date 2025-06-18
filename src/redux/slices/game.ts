import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface GameSlice {
    gameStarted: boolean
}

const initialState: GameSlice = {
    gameStarted: false,
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGameStarted: (state, action: PayloadAction<boolean>) => {
            state.gameStarted = action.payload
        }
    },
})

export const gameReducer = gameSlice.reducer
export const { setGameStarted } = gameSlice.actions
