import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum EditAvatarModalTab {
    URL = "URL",
    LocalFile = "LocalFile",
}
export interface EditAvatarModalState {
  tab: EditAvatarModalTab
}

const initialState: EditAvatarModalState = {
    tab: EditAvatarModalTab.URL,
}

export const editAvatarModalSlice = createSlice({
    name: "editAvatarModal",
    initialState,
    reducers: {
        setEditAvatarModalTab: (state, action: PayloadAction<EditAvatarModalTab>) => {
            state.tab = action.payload  
        },
    },
})

export const editAvatarModalReducer = editAvatarModalSlice.reducer
export const { setEditAvatarModalTab } = editAvatarModalSlice.actions
