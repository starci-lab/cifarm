import { createSlice } from "@reduxjs/toolkit"

export interface SettingsSlice {
    darkMode: boolean
}

const initialState: SettingsSlice = {
    darkMode: false,
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload
        }
    },
})

export const settingsReducer = settingsSlice.reducer
export const { setDarkMode } = settingsSlice.actions
