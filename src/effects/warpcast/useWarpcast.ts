import { sdk } from "@farcaster/frame-sdk"
import { useEffect } from "react"

export const useWarpcast = () => {
    useEffect(() => {
        const handleEffect = async () => {
            await sdk.actions.ready()
        }
        handleEffect()
    }, [])
}

