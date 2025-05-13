export interface PopupOptions<MessageData, ErrorData> {
    url: string;
    name?: string;
    width?: number;
    height?: number;
    onClose?: () => void;
    onMessage?: (message: MessageData) => void;
    onError?: (error: ErrorData | string | Error) => void;
    originFilter?: string | RegExp;
    timeout?: number;
  }
  
export const openPopup = <MessageData, ErrorData>({
    url,
    name = "popup",
    width = 500,
    height = 750,
    onClose,
    onMessage,
    onError,
    originFilter,
    timeout = 60000,
}: PopupOptions<MessageData, ErrorData>): Window => {
    if (typeof window === "undefined") throw new Error("Window not defined")
    const popup = window.open(
        url,
        name,
        `width=${Math.min(window.innerWidth * 0.8, width)},height=${Math.min(
            window.innerHeight * 0.8,
            height
        )},scrollbars=yes,resizable=yes`
    )
  
    if (!popup) {
        const error = new Error("Popup blocked by browser")
        onError?.(error.message)
        throw error
    }
  
    const handleMessage = (event: MessageEvent<MessageData>) => {
        try {
            // Check origin if filter is provided
            if (originFilter) {
                const originMatches =
              typeof originFilter === "string"
                  ? event.origin === originFilter
                  : originFilter.test(event.origin)
            
                if (!originMatches) return
            }
  
            const data = event.data
            let messageData: MessageData
            if (typeof data === "string") {
                messageData = JSON.parse(data)
            } else {
                messageData = data
            }
            onMessage?.(messageData)
            cleanup()
        } catch (error) {
            handleError(error instanceof Error ? error : new Error(String(error)))
        }
    }
  
    const handleError = (error: ErrorData | string | Error) => {
        const errorObj = typeof error === "string" ? new Error(error) : error
        onError?.(errorObj)
    }
  
    // Detect popup close by polling
    const pollInterval = setInterval(() => {
        if (popup.closed) {
            const error = new Error("Popup was closed by the user")
            onClose?.()
            handleError(error)
        }
    }, 500)
  
    // Fallback timeout
    const timeoutId = setTimeout(() => {
        handleError("Popup timed out")
    }, timeout)
  
    const cleanup = () => {
        clearTimeout(timeoutId)
        clearInterval(pollInterval)
        window.removeEventListener("message", handleMessage)
        try {
            if (popup && !popup.closed) popup.close()
        } catch (error) {
            console.warn("Failed to close popup:", error)
        }
    }
  
    window.addEventListener("message", handleMessage)

    return popup
}