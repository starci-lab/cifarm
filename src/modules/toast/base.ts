import toast from "react-hot-toast"

export const DURATION = 1000
export const toastSuccess = (message: string) => toast.success(message, {
    duration: DURATION
})
export const toastError = (message: string) => toast.error(message, {
    duration: DURATION
})
export const toastLoading = (message: string) => toast.loading(message, {
    duration: DURATION
})