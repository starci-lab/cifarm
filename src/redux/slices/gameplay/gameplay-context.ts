// slice for selection of inventories, products, etc, ...
// store all the selection state here
import { UserSchema } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum PlayerContext {
  Home = "home",
  Neighbor = "neighbor",
  Moving = "moving",
  Selling = "selling",
  PlacingNFT = "placingNFT",
  Buying = "buying",
}

export interface GameplayContextSlice {
  // selected placed item id
  playerContext: PlayerContext;
  showGameUI: boolean;
  visitedUser?: UserSchema;
}

const initialState: GameplayContextSlice = {
    playerContext: PlayerContext.Home,
    showGameUI: false,
}

export const gameplayContextSlice = createSlice({
    name: "gameplayContext",
    initialState,
    reducers: {
        setPlayerContext: (state, action: PayloadAction<PlayerContext>) => {
            state.playerContext = action.payload
        },
        setShowGameUI: (state, action: PayloadAction<boolean>) => {
            state.showGameUI = action.payload
        },
        setVisitedUser: (state, action: PayloadAction<UserSchema | undefined>) => {
            state.visitedUser = action.payload
        },
    },
})

export const gameplayContextReducer = gameplayContextSlice.reducer
export const { setPlayerContext, setShowGameUI, setVisitedUser } =
  gameplayContextSlice.actions
