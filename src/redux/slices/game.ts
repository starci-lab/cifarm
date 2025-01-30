import { createSlice } from "@reduxjs/toolkit"

export interface GameSlice {
  authenticated: boolean;
}

const initialState: GameSlice = {
    authenticated: false,
}

export const authenticatedSlice = createSlice({
    name: "authenticated",
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload
        },
    },
})

export const gameReducer = authenticatedSlice.reducer
export const { setAuthenticated } = authenticatedSlice.actions
