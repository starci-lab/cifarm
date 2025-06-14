import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { WS } from "@/app/(core)/constants"
import { BuySuppliesMessage, toast, useWs } from "@/hooks"
import { EmitterEventName, ReceiverEventName } from "@/hooks"
import { ExternalEventName } from "@/modules/event-emitter"
import { ExternalEventEmitter } from "@/modules/event-emitter"
import { assetShopMap } from "@/modules/assets"
import pluralize from "pluralize"
import { setShopSupply } from "@/redux"
import { useAppDispatch } from "@/redux"

export const useBuySuppliesEffects = () => {
    const { socket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)
    const dispatch = useAppDispatch()
    useEffect(() => {
        socket?.on(ReceiverEventName.BuySuppliesResponsed, ({
            quantity,
            supplyId,
        }: BuySuppliesMessage) => {
            const supplyName = assetShopMap.supplies[supplyId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${quantity} ${
                    quantity > 1 ? pluralize(supplyName) : supplyName
                }`,
            })
            dispatch(setShopSupply({ supplyId, isLoading: false }))
        })
        return () => {
            socket?.off(ReceiverEventName.BuySuppliesResponsed)
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
            socket?.off(ReceiverEventName.BuySuppliesResponsed)
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuySupplies)
        }
    }, [socket])
}
