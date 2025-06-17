import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import {
    EmitterEventName,
    UpdateProfileMessage,
    useWs,
} from "@/hooks"
import { WS } from "@/app/(core)/constantsd"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useUpdateProfileEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        console.log("use update profile effects")
        ExternalEventEmitter.on(
            ExternalEventName.RequestUpdateProfile,
            async (message: UpdateProfileMessage) => {
                console.log("update profile", message)
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UpdateProfile, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUpdateProfile
            )
        }
    }, [socket])
}
