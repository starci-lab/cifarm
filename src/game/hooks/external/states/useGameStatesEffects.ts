import { pathConstants } from "@/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/game/events"
import { useRouterWithSearchParams } from "@/hooks"
import { useAppDispatch } from "@/redux/hooks"
import { setShowGameUI } from "@/redux/slices/session"
import { useEffect } from "react"

export const useGameStatesEffects = () => {
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.CloseGame, () => {
            router.push(pathConstants.home)
        })
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.CloseGame)
        }
    }, [router])

    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.ShowGameUI, () => {
            dispatch(setShowGameUI(true))
        })
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.ShowGameUI)
        }
    }, [dispatch])
}