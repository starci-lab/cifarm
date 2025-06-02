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
  useAdvancedSearch: boolean
  levelRange: number
  status: NeighborsSearchStatus
  appliedLevelRange: number
  appliedStatus: NeighborsSearchStatus
  searchString: string
  appliedUseAdvancedSearch: boolean
  appliedSearchString: string
}

export interface FolloweesSearch {
  useAdvancedSearch: boolean
  levelRange: number
  status: NeighborsSearchStatus
  appliedLevelRange: number
  appliedStatus: NeighborsSearchStatus
  searchString: string
  appliedUseAdvancedSearch: boolean
  appliedSearchString: string
}

export interface SearchSlice {
  selectedSearch: SelectedSearch
  neighborsSearch: NeighborsSearch
  followeesSearch: FolloweesSearch
}

const initialState: SearchSlice = {
    selectedSearch: SelectedSearch.Neighbors,
    neighborsSearch: {
        useAdvancedSearch: false,
        levelRange: 0,
        status: NeighborsSearchStatus.All,
        appliedLevelRange: 0,
        appliedStatus: NeighborsSearchStatus.All,
        searchString: "",
        appliedUseAdvancedSearch: false,
        appliedSearchString: "",
    },
    followeesSearch: {
        useAdvancedSearch: false,
        levelRange: 0,
        status: NeighborsSearchStatus.All,
        appliedLevelRange: 0,
        appliedStatus: NeighborsSearchStatus.All,
        searchString: "",
        appliedUseAdvancedSearch: false,
        appliedSearchString: "",
    },
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSelectedSearch: (state, action: PayloadAction<SelectedSearch>) => {
            state.selectedSearch = action.payload
        },
        // Neighbors Search - individual field setters
        setUseAdvancedNeighborsSearch: (state, action: PayloadAction<boolean>) => {
            state.neighborsSearch.useAdvancedSearch = action.payload
        },
        setNeighborsSearchLevelRange: (state, action: PayloadAction<number>) => {
            state.neighborsSearch.levelRange = action.payload
        },
        setNeighborsSearchStatus: (state, action: PayloadAction<NeighborsSearchStatus>) => {
            state.neighborsSearch.status = action.payload
        },
        setNeighborsSearchString: (state, action: PayloadAction<string>) => {
            state.neighborsSearch.searchString = action.payload
        },
        setNeighborsSearchAppliedLevelRange: (state, action: PayloadAction<number>) => {
            state.neighborsSearch.appliedLevelRange = action.payload
        },
        setNeighborsSearchAppliedStatus: (state, action: PayloadAction<NeighborsSearchStatus>) => {
            state.neighborsSearch.appliedStatus = action.payload
        },
        setNeighborsSearchAppliedUseAdvancedSearch: (state, action: PayloadAction<boolean>) => {
            state.neighborsSearch.appliedUseAdvancedSearch = action.payload
        },
        setNeighborsSearchAppliedSearchString: (state, action: PayloadAction<string>) => {
            state.neighborsSearch.appliedSearchString = action.payload
        },
        // Followees Search - individual field setters
        setUseAdvancedFolloweesSearch: (state, action: PayloadAction<boolean>) => {
            state.followeesSearch.useAdvancedSearch = action.payload
        },
        setFolloweesSearchLevelRange: (state, action: PayloadAction<number>) => {
            state.followeesSearch.levelRange = action.payload
        },
        setFolloweesSearchStatus: (state, action: PayloadAction<NeighborsSearchStatus>) => {
            state.followeesSearch.status = action.payload
        },
        setFolloweesSearchString: (state, action: PayloadAction<string>) => {
            state.followeesSearch.searchString = action.payload
        },
        setFolloweesSearchAppliedLevelRange: (state, action: PayloadAction<number>) => {
            state.followeesSearch.appliedLevelRange = action.payload
        },
        setFolloweesSearchAppliedStatus: (state, action: PayloadAction<NeighborsSearchStatus>) => {
            state.followeesSearch.appliedStatus = action.payload
        },
        setFolloweesSearchAppliedUseAdvancedSearch: (state, action: PayloadAction<boolean>) => {
            state.followeesSearch.appliedUseAdvancedSearch = action.payload
        },
        setFolloweesSearchAppliedSearchString: (state, action: PayloadAction<string>) => {
            state.followeesSearch.appliedSearchString = action.payload
        },
    },
})

export const searchReducer = searchSlice.reducer

export const {
    setSelectedSearch,
    setUseAdvancedNeighborsSearch,
    setNeighborsSearchLevelRange,
    setNeighborsSearchStatus,
    setNeighborsSearchString,
    setNeighborsSearchAppliedLevelRange,
    setNeighborsSearchAppliedStatus,
    setUseAdvancedFolloweesSearch,
    setFolloweesSearchLevelRange,
    setFolloweesSearchStatus,
    setFolloweesSearchString,
    setFolloweesSearchAppliedLevelRange,
    setFolloweesSearchAppliedStatus,
    setFolloweesSearchAppliedUseAdvancedSearch,
    setFolloweesSearchAppliedSearchString,
    setNeighborsSearchAppliedUseAdvancedSearch,
    setNeighborsSearchAppliedSearchString,
} = searchSlice.actions
