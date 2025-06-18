import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    InventorySchema,
    PlacedItemSchema,
    UserSchema,
} from "@/types"
import {
    QueryBulkPaidsResponse,
    QueryStaticResponse,
    QueryVaultCurrentResponse,
} from "@/modules/apollo"

export interface Counted<T> {
  data: Array<T>;
  count: number;
}
export interface CoreState {
  user?: UserSchema;
  static?: QueryStaticResponse;
  neighbors: Counted<UserSchema>;
  followees: Counted<UserSchema>;
  inventories: Array<InventorySchema>;
  placedItems: Array<PlacedItemSchema>;
  storedPlacedItems: Counted<PlacedItemSchema>;
  bulkPaids?: QueryBulkPaidsResponse;
  vaultCurrent?: QueryVaultCurrentResponse;
  leaderboard: Array<UserSchema>;
}

const initialState: CoreState = {
    neighbors: {
        data: [],
        count: 0,
    },
    followees: {
        data: [],
        count: 0,
    },
    inventories: [],
    placedItems: [],
    storedPlacedItems: {
        data: [],
        count: 0,
    },
    leaderboard: [],
}

export const coreApiSlice = createSlice({
    name: "coreApi",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema | undefined>) => {
            state.user = action.payload
        },
        setStatic: (
            state,
            action: PayloadAction<QueryStaticResponse | undefined>
        ) => {
            state.static = action.payload
        },
        setNeighbors: (state, action: PayloadAction<Counted<UserSchema>>) => {
            state.neighbors = action.payload
        },
        setFollowees: (state, action: PayloadAction<Counted<UserSchema>>) => {
            state.followees = action.payload
        },
        setInventories: (state, action: PayloadAction<Array<InventorySchema>>) => {
            state.inventories = action.payload
        },
        setPlacedItems: (state, action: PayloadAction<Array<PlacedItemSchema>>) => {
            state.placedItems = action.payload
        },
        setStoredPlacedItems: (state, action: PayloadAction<Counted<PlacedItemSchema>>) => {
            state.storedPlacedItems = action.payload
        },
        setBulkPaids: (
            state,
            action: PayloadAction<QueryBulkPaidsResponse | undefined>
        ) => {
            state.bulkPaids = action.payload
        },
        setVaultCurrent: (
            state,
            action: PayloadAction<QueryVaultCurrentResponse | undefined>
        ) => {
            state.vaultCurrent = action.payload
        },
        setLeaderboard: (state, action: PayloadAction<Array<UserSchema>>) => {
            state.leaderboard = action.payload
        },
    },
})

export const coreApiReducer = coreApiSlice.reducer
export const {
    setUser,
    setStatic,
    setNeighbors,
    setFollowees,
    setInventories,
    setPlacedItems,
    setStoredPlacedItems,
    setBulkPaids,
    setLeaderboard,
    setVaultCurrent,
} = coreApiSlice.actions
