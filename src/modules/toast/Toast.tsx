import { Toaster } from "react-hot-toast"
import React from "react"
import { useIsMobile } from "@/hooks"

export const Toast = () => {
    const isMobile = useIsMobile()
    return (
        <Toaster
            position={isMobile ? "bottom-center" : "top-right"}
            toastOptions={{ duration: 3000 }}
        />
    )
}
