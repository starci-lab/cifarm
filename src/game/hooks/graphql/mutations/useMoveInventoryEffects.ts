import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo, EmitterEventName } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { MoveInventoryRequest } from "@/modules/apollo"

export const useMoveInventoryEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestMoveInventory, async (message: MoveInventoryRequest) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.MoveInventory, message)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestMoveInventory)
        }
    }, [socket])
}