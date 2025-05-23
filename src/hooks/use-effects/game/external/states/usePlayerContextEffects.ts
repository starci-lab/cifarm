import {
    ExternalEventEmitter,
    ExternalEventName,
    UpdatePlayerContextMessage,
} from "@/modules/event-emitter"
import { ReceiverEventName, useRouterWithSearchParams, useWs } from "@/hooks"
import { useAppDispatch } from "@/redux/hooks"
import { setPlayerContext } from "@/redux/slices/session"
import { useEffect } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { DISCONNECTED_DISCLOSURE, WS } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"

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

    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(DISCONNECTED_DISCLOSURE)
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        socket?.on(ReceiverEventName.Disconnected, () => {
            open()
        })
        return () => {
            socket?.off(ReceiverEventName.Disconnected)
        }
    }, [socket, open])
}
