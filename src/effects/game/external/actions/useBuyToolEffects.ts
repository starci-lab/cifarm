import {
    BuyToolMessage,
    EmitterEventName,
    ReceiverEventName,
    useSingletonHook,
    useWs,
    WS,
} from "@/singleton"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import { assetShopMap } from "@/modules/assets"
import { setShopTool } from "@/redux"
import { useAppDispatch } from "@/redux"
import { addSuccessToast } from "@/components"

export const useBuyToolEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket?.on(
            ReceiverEventName.BuyToolResponsed,
            ({ toolId }: BuyToolMessage) => {
                const toolName = assetShopMap.tools[toolId]?.name?.toLowerCase() ?? ""
                addSuccessToast({
                    successMessage: `Bought ${toolName}`,
                })
                dispatch(setShopTool({ toolId, isLoading: false }))
            }
        )
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
