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
import { WS, NOTIFICATION_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import { setNotificationModal } from "@/redux"

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

    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    const { open, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(NOTIFICATION_DISCLOSURE)
    
    useEffect(() => {
        socket?.on(ReceiverEventName.YourAccountHasBeenLoggedInFromAnotherDevice, () => {
            dispatch(setNotificationModal({
                message: "Your account has been logged in from another device. Please connect again to continue.",
                callback: () => {
                    socket?.connect()  
                    close()
                },
                title: "You have been disconnected",
                buttonText: "Connect again",
            }))
            open()
        })
        return () => {
            socket?.off(ReceiverEventName.YourAccountHasBeenLoggedInFromAnotherDevice)
        }
    }, [socket, open, dispatch])
 
    useEffect(() => {
        socket?.on("disconnect", () => {
            dispatch(setNotificationModal({
                message: "You are not connected to the server. Please connect again to continue.",
                callback: () => {
                    socket?.connect()  
                    close()
                },
                title: "You have been disconnected",
                buttonText: "Connect again",
            }))
            open()
        })
        return () => {
            socket?.off("disconnect")
        }
    }, [socket, open, dispatch])
}
