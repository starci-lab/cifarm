import {
    ExternalEventEmitter,
    ExternalEventName,
    UpdatePlayerContextMessage,
} from "@/modules/event-emitter"
import { useRouterWithSearchParams } from "@/hooks"
import { useAppDispatch } from "@/redux/hooks"
import { setPlayerContext } from "@/redux/slices/session"
import { useEffect } from "react"

export const usePlayerContextEffects = () => {
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.UpdatePlayerContext,
            ({ playerContext }: UpdatePlayerContextMessage) => {
                dispatch(setPlayerContext(playerContext))
            }
        )
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.UpdatePlayerContext
            )
        }
    }, [router])
}
