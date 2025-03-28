import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, EmitterEventName, MoveInventoryMessage } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useMoveInventoryEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestMoveInventory,
            async (message: MoveInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.MoveInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestMoveInventory)
        }
    }, [socket])
}