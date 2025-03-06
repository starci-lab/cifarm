import { pathConstants } from "@/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useRouterWithSearchParams } from "@/hooks"
import { setVisitedUserId, useAppDispatch } from "@/redux"
import { useEffect } from "react"

export const useGameStatesEffects = () => {
    const dispatch = useAppDispatch()
    const router = useRouterWithSearchParams()
    useEffect(() => {
        EventBus.on(EventName.Return, () => {
            dispatch(setVisitedUserId())
        })
        return () => {
            EventBus.removeListener(EventName.Return)
        }
    }, [dispatch])

    useEffect(() => {
        EventBus.on(EventName.CloseGame, () => {
            router.push(pathConstants.home)
        })
        return () => {
            EventBus.removeListener(EventName.CloseGame)
        }
    }, [router])
}