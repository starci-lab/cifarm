import { TutorialStep } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TutorialSlice {
  tutorialStep: TutorialStep;
  tutorialIndex: number;
  callback?: (() => Promise<void>);
}

const initialState: TutorialSlice = {
    tutorialStep: TutorialStep.Start,
    tutorialIndex: 0,
}


export const tutorialSlice = createSlice({
    name: "tutorial",
    initialState,
    reducers: {
        setTutorialStep: (state, action: PayloadAction<TutorialStep>) => {
            state.tutorialStep = action.payload
        },
        setTutorialIndex: (state, action: PayloadAction<number>) => {
            state.tutorialIndex = action.payload
        },
        setTutorialCallback: (state, action: PayloadAction<(() => Promise<void>)>) => {
            state.callback = action.payload
        },
    },
})

export const tutorialReducer = tutorialSlice.reducer
export const { setTutorialStep, setTutorialIndex, setTutorialCallback } = tutorialSlice.actions
