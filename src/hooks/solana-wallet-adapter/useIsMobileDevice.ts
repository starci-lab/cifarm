import { useMemo } from "react"

export const useIsMobileDevice = (): boolean => {
    return useMemo(() => {
        if (typeof navigator === "undefined") return false
        const userAgent = navigator.userAgent
        return /android|iphone|ipad|ipod|windows phone/i.test(userAgent)
    }, [])
}