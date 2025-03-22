import { pathConstants } from "@/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useRouterWithSearchParams } from "@/hooks"
import { useEffect } from "react"

export const useGameStatesEffects = () => {
    const router = useRouterWithSearchParams()
    useEffect(() => {
        EventBus.on(EventName.CloseGame, () => {
            router.push(pathConstants.home)
        })
        return () => {
            EventBus.removeListener(EventName.CloseGame)
        }
    }, [router])
}