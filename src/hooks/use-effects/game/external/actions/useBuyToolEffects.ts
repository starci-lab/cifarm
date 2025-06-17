import { WS } from "@/app/(core)/constantsd"
import { BuyToolMessage, toast, useWs } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { EmitterEventName, ReceiverEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { assetShopMap } from "@/modules/assets"
import { setShopTool } from "@/redux"
import { useAppDispatch } from "@/redux"

export const useBuyToolEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket?.on(ReceiverEventName.BuyToolResponsed, ({
            toolId,
        }: BuyToolMessage) => {
            const toolName = assetShopMap.tools[toolId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${toolName}`,
            })
            dispatch(setShopTool({ toolId, isLoading: false }))
        })
        return () => {
            socket?.off(ReceiverEventName.BuyToolResponsed)
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
