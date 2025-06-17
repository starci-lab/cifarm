import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface NotificationModal {
    message?: string
    title?: string
    buttonText?: string
    callback?: () => void | Promise<void>
}

const initialState: NotificationModal = {}

export const notificationModalSlice = createSlice({
    name: "notificationModal",
    initialState,
    reducers: {
        setNotificationModalContent: (state, action: PayloadAction<NotificationModal>) => {
            state = action.payload
        }
    }
})

export const { setNotificationModalContent } = notificationModalSlice.actions

export const notificationModalReducer = notificationModalSlice.reducer