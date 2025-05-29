import { useEffect, useState } from "react"

type DevToolsOrientation = "vertical" | "horizontal" | undefined

interface DevToolsState {
    isOpen: boolean
    orientation: DevToolsOrientation
}

interface FirebugChrome {
    isInitialized: boolean
}

interface Firebug {
    chrome: FirebugChrome
}

declare global {
    interface Window {
        Firebug?: Firebug
    }
}

const THRESHOLD = 170

export function useDevTools() {
    const [devTools, setDevTools] = useState<DevToolsState>({
        isOpen: false,
        orientation: undefined
    })

    useEffect(() => {
        const checkDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > THRESHOLD
            const heightThreshold = window.outerHeight - window.innerHeight > THRESHOLD
            const orientation: DevToolsOrientation = widthThreshold ? "vertical" : "horizontal"

            if (
                !(heightThreshold && widthThreshold) &&
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
            ) {
                setDevTools({
                    isOpen: true,
                    orientation
                })
            } else {
                setDevTools({
                    isOpen: false,
                    orientation: undefined
                })
            }
        }

        // Initial check
        checkDevTools()

        // Set up interval for checking
        const interval = setInterval(checkDevTools, 500)

        // Set up event listener for window resize
        window.addEventListener("resize", checkDevTools)

        return () => {
            clearInterval(interval)
            window.removeEventListener("resize", checkDevTools)
        }
    }, [])

    return devTools
} 