import { WS } from "@/app/(core)/constantsd"
import { useWs, EmitterEventName, DeleteInventoryMessage } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useDeleteInventoryEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestDeleteInventory,
            async (message: DeleteInventoryMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.DeleteInventory, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestDeleteInventory)
        }
    }, [socket])
}