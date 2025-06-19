// a custom hook to determine if current session is from mobile callback

import { useSearchParams } from "next/navigation"
import { useIsMobileDevice } from "./useIsMobileDevice"

export const useFromCallback = () => {
    // check if current session is from mobile callback
    const isMobileDevice = useIsMobileDevice()
    const searchParams = useSearchParams()
    const action = searchParams.get("action")
    return isMobileDevice && action
}
