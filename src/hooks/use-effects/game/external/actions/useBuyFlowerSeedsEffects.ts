import { WS } from "@/app/constants"
import { BuyFlowerSeedsMessage, toast, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName, ReceiverEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { assetShopMap } from "@/modules/assets"
import pluralize from "pluralize"
import { setShopFlower } from "@/redux"
import { useAppDispatch } from "@/redux"

export const useBuyFlowerSeedsEffects = () => {
    //get the singleton instance of the buy seeds mutation
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket?.on(ReceiverEventName.BuyFlowerSeedsResponsed, ({
            flowerId,
            quantity,
        }: BuyFlowerSeedsMessage) => {
            const flowerName = assetShopMap.flowers[flowerId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${quantity} ${
                    quantity > 1 ? pluralize(flowerName) : flowerName
                }`,
            })
            dispatch(setShopFlower({ flowerId, isLoading: false }))
        })
        return () => {
            socket?.off(ReceiverEventName.BuyFlowerSeedsResponsed)
        }
    }, [socket])
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestBuyFlowerSeeds, async (message: BuyFlowerSeedsMessage) => {
            if (!socket) {
                return  
            }
            socket.emit(EmitterEventName.BuyFlowerSeeds, message)
            // return the user to the phaser
        })
    
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyFlowerSeeds)
        }
    }, [socket])
}