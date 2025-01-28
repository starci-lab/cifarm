import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WarningModal {
    message: string
    nextModalToken: string
}

export interface ModalSlice {
    warningModal: WarningModal
}

const initialState: ModalSlice = {
    warningModal: {
        message: "",
        nextModalToken: "",
    },
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setWarningModal: (state, action: PayloadAction<WarningModal>) => {
            state.warningModal = action.payload
        }
    },
})

export const modalReducer = modalSlice.reducer
export const { setWarningModal } = modalSlice.actions
