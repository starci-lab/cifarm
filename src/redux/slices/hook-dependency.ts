import { createSlice } from "@reduxjs/toolkit"

export interface HookDependencySlice {
  loadAccountsKey: number;
}

const initialState: HookDependencySlice = {
    loadAccountsKey: 0,
}

export const hookDependencySlice = createSlice({
    name: "hookDependency",
    initialState,
    reducers: {
        triggerLoadAccounts: (state) => {
            state.loadAccountsKey += 1
        }
    },
})

export const hookDependencyReducer = hookDependencySlice.reducer
export const { triggerLoadAccounts } = hookDependencySlice.actions
