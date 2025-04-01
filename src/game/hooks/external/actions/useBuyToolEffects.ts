import { GAMEPLAY_IO } from "@/app/constants"
import { BuyToolMessage, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName, ReceiverEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useBuyToolEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(GAMEPLAY_IO)

    useEffect(() => {
        socket?.on(ReceiverEventName.ToolBought, () => {
            ExternalEventEmitter.emit(ExternalEventName.BuyToolResponsed)
        })
        return () => {
            socket?.off(ReceiverEventName.ToolBought)
        }
    }, [socket])

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuyTool,
            async (message: BuyToolMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuyTool, message)
                // return the user to the phaser
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyTool)
        }
    }, [socket])
}
