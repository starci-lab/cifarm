import { Toaster } from "react-hot-toast"
import React from "react"

export const Toast = () => {
    return <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
}