import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WarningModalState {
    message: string;
    nextModalToken?: string;
    callback?: () => void;
  }

const initialState: WarningModalState = {
    message: "",
    nextModalToken: undefined,
    callback: undefined,
}

export const warningModalSlice = createSlice({
    name: "warningModal",
    initialState,
    reducers: {
        setWarningModalContent: (state, action: PayloadAction<WarningModalState>) => {
            state = action.payload
        }
    }
})

export const warningModalReducer = warningModalSlice.reducer
export const { setWarningModalContent } = warningModalSlice.actions