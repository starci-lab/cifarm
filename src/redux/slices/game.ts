import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSchema } from "@/modules/entities"

export interface GameSlice {
    visitedUser?: UserSchema
    gameStarted: boolean
}

const initialState: GameSlice = {
    gameStarted: false,
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setVisitedUser: (state, action: PayloadAction<UserSchema | undefined>) => {
            state.visitedUser = action.payload
        },
        setGameStarted: (state, action: PayloadAction<boolean>) => {
            state.gameStarted = action.payload
        }
    },
})

export const gameReducer = gameSlice.reducer
export const { setVisitedUser, setGameStarted } = gameSlice.actions
