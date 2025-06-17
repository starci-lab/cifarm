
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum NeighborsModalTab {
    Neighbors = "neighbors",
    Followees = "followees",
}

export interface NeighborsModalState {
    selectedTab: NeighborsModalTab
}

const initialState: NeighborsModalState = {
    selectedTab: NeighborsModalTab.Neighbors
}

export const neighborsModalSlice = createSlice({
    name: "neighborsModal",
    initialState,
    reducers: {
        setNeighborsModalSelectedTab: (state, action: PayloadAction<NeighborsModalTab>) => {
            state.selectedTab = action.payload
        }
    }
})

export const neighborsModalReducer = neighborsModalSlice.reducer
export const { setNeighborsModalSelectedTab } = neighborsModalSlice.actions