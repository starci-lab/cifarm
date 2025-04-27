import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { WS } from "@/app/constants"
import { BuySuppliesMessage, toast, useWs } from "@/hooks"
import { EmitterEventName, ReceiverEventName, SuppliesBoughtMessage } from "@/hooks"
import { ExternalEventName } from "@/modules/event-emitter"
import { ExternalEventEmitter } from "@/modules/event-emitter"
import { assetShopMap } from "@/modules/assets"
import pluralize from "pluralize"

export const useBuySuppliesEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        socket?.on(ReceiverEventName.SuppliesBought, ({
            quantity,
            supplyId,
        }: SuppliesBoughtMessage) => {
            const supplyName = assetShopMap.supplies[supplyId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${quantity} ${
                    quantity > 1 ? pluralize(supplyName) : supplyName
                }`,
            })
        })
        return () => {
            socket?.off(ReceiverEventName.SuppliesBought)
        }
    }, [socket])
    
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestBuySupplies,
            async (message: BuySuppliesMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.BuySupplies, message)
            }
        )

        return () => {
            socket?.off(ReceiverEventName.SuppliesBought)
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuySupplies)
        }
    }, [socket])
}
