import { pathConstants } from "@/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/game/events"
import { useRouterWithSearchParams } from "@/hooks"
import { useEffect } from "react"

export const useGameStatesEffects = () => {
    const router = useRouterWithSearchParams()
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.CloseGame, () => {
            router.push(pathConstants.home)
        })
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.CloseGame)
        }
    }, [router])
}