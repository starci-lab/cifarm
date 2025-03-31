import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, useGameplayIo} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
import { DisplayTimersMessage, ReceiverEventName } from "@/hooks"
export const useTimerEffects = () => {
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on(ReceiverEventName.DisplayTimersResponsed, ({ ids }: DisplayTimersMessage) => {
            ExternalEventEmitter.emit(ExternalEventName.DisplayTimersResponsed, {
                ids,
            })
        })
    }, [socket])

    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestDisplayTimers, ({ ids }: DisplayTimersMessage) => {
            console.log({ ids })
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.RequestDisplayTimers, {
                ids,
            })
        })
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestDisplayTimers
            )
        }
    }, [socket])
}