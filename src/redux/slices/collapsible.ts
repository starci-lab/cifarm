import { createSlice } from "@reduxjs/toolkit"

export interface CollapsibleSlice {
    operations: boolean
    honeycombProtocols: boolean
    tokens: boolean
    nfts: boolean
}

const initialState: CollapsibleSlice = {
    operations: false,
    honeycombProtocols: false,
    tokens: false,
    nfts: false,
}

export const collapsibleSlice = createSlice({
    name: "collapsible",
    initialState,
    reducers: {
        setOperations: (state, action) => {
            state.operations = action.payload
        },
        setHoneycombProtocols: (state, action) => {
            state.honeycombProtocols = action.payload
        },
        setTokens: (state, action) => {
            state.tokens = action.payload
        },
        setNFTs: (state, action) => {
            state.nfts = action.payload
        },
    },
})

export const collapsibleReducer = collapsibleSlice.reducer
export const { setOperations, setHoneycombProtocols, setTokens, setNFTs } = collapsibleSlice.actions
