import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum NeighborsSearchStatus {
  All = "all",
  Online = "online",
  Offline = "offline",
}

export enum SelectedSearch {
  Neighbors = "neighbors",
  Followees = "followees",
}

export interface NeighborsSearch {
  useAdvancedSearch: boolean;
  levelRange: number;
  status: NeighborsSearchStatus;
  appliedLevelRange: number;
  appliedStatus: NeighborsSearchStatus;
}

export interface FolloweesSearch {
  useAdvancedSearch: boolean;
  levelRange: number;
  status: NeighborsSearchStatus;
  appliedLevelRange: number;
  appliedStatus: NeighborsSearchStatus;
}

export interface SearchSlice {
  selectedSearch: SelectedSearch;
  neighborsSearch: NeighborsSearch;
  followeesSearch: FolloweesSearch;
}

const initialState: SearchSlice = {
    selectedSearch: SelectedSearch.Neighbors,
    neighborsSearch: {
        useAdvancedSearch: false,
        levelRange: 0,
        status: NeighborsSearchStatus.All,
        appliedLevelRange: 0,
        appliedStatus: NeighborsSearchStatus.All,
    },
    followeesSearch: {
        useAdvancedSearch: false,
        levelRange: 0,
        status: NeighborsSearchStatus.All,
        appliedLevelRange: 0,
        appliedStatus: NeighborsSearchStatus.All,
    },
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSelectedSearch: (state, action: PayloadAction<SelectedSearch>) => {
            state.selectedSearch = action.payload
        },
        setUseAdvancedNeighborsSearch: (state, action: PayloadAction<boolean>) => {
            state.neighborsSearch.useAdvancedSearch = action.payload
        },
        setUseAdvancedFolloweesSearch: (state, action: PayloadAction<boolean>) => {
            state.followeesSearch.useAdvancedSearch = action.payload
        },
        setNeighborsSearchLevelRange: (state, action: PayloadAction<number>) => {
            state.neighborsSearch.levelRange = action.payload
        },
        setNeighborsSearchStatus: (
            state,
            action: PayloadAction<NeighborsSearchStatus>
        ) => {
            state.neighborsSearch.status = action.payload
        },
        setFolloweesSearchLevelRange: (state, action: PayloadAction<number>) => {
            state.followeesSearch.levelRange = action.payload
        },
        setFolloweesSearchStatus: (
            state,
            action: PayloadAction<NeighborsSearchStatus>
        ) => {
            state.followeesSearch.status = action.payload
        },
        setAppliedNeighborsSearch: (
            state,
            action: PayloadAction<Pick<NeighborsSearch, "levelRange" | "status">>
        ) => {
            state.neighborsSearch.appliedLevelRange = action.payload.levelRange
            state.neighborsSearch.appliedStatus = action.payload.status
        },
        setAppliedFolloweesSearch: (
            state,
            action: PayloadAction<Pick<FolloweesSearch, "levelRange" | "status">>
        ) => {
            state.followeesSearch.appliedLevelRange = action.payload.levelRange
            state.followeesSearch.appliedStatus = action.payload.status
        },
    },
})

export const searchReducer = searchSlice.reducer
export const {
    setUseAdvancedNeighborsSearch,
    setUseAdvancedFolloweesSearch,
    setNeighborsSearchLevelRange,
    setNeighborsSearchStatus,
    setFolloweesSearchLevelRange,
    setFolloweesSearchStatus,
    setAppliedNeighborsSearch,
    setAppliedFolloweesSearch,
} = searchSlice.actions
