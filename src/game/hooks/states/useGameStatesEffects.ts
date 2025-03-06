import { EventBus, EventName } from "@/game/event-bus"
import { setVisitedUserId, useAppDispatch } from "@/redux"
import { useEffect } from "react"

export const useGameStatesEffects = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        EventBus.on(EventName.Return, () => {
            dispatch(setVisitedUserId())
        })
        return () => {
            EventBus.removeListener(EventName.Return)
        }
    }, [])
}