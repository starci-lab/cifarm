import { GAMEPLAY_IO } from "@/app/constants"
import { BuyToolMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName, ReceiverEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useBuyToolEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyTool,
            async (message: BuyToolMessage) => {
                if (!socket) {
                    return
                }
                socket.on(ReceiverEventName.ToolBought, () => {
                    ExternalEventEmitter.emit(ExternalEventName.BuyToolResponsed)
                })
                socket.emit(EmitterEventName.BuyTool, message)
                // return the user to the phaser
            }
        )

        return () => {
            socket?.off(ReceiverEventName.ToolBought)
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyTool)
        }
    }, [socket])
}
