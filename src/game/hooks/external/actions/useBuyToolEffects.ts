import { WS } from "@/app/constants"
import { BuyToolMessage, toast, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName, ReceiverEventName, ToolBoughtMessage } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
import { assetShopMap } from "@/modules/assets"

export const useBuyToolEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        socket?.on(ReceiverEventName.ToolBought, ({
            toolId,
        }: ToolBoughtMessage) => {
            const toolName = assetShopMap.tools[toolId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${toolName}`,
            })
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
