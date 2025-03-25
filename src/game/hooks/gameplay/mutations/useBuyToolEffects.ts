import { GAMEPLAY_IO } from "@/app/constants"
import { useGameplayIo } from "@/hooks"
import { BuyToolRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { EmitterEventName, ReceiverEventName } from "@/hooks"

export const useBuyToolEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestBuyTool, async (message: BuyToolRequest) => {
            if (!socket) {
                return
            }
            socket.on(ReceiverEventName.ToolBought, () => {
                EventBus.emit(EventName.BuyToolResponsed)
            })
            socket.emit(EmitterEventName.BuyTool, message) 
        })

        return () => {
            socket?.off(ReceiverEventName.ToolBought)
            EventBus.removeListener(EventName.RequestBuyTool)
        }
    }, [socket])
}