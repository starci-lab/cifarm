import { WS } from "@/app/constants"
import { BuyFlowerSeedsMessage, toast, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EmitterEventName, ReceiverEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
import { assetShopMap } from "@/modules/assets"
import pluralize from "pluralize"
export const useBuyFlowerSeedsEffects = () => {
    //get the singleton instance of the buy seeds mutation
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        socket?.on(ReceiverEventName.FlowerSeedsBought, ({
            flowerId,
            quantity,
        }: BuyFlowerSeedsMessage) => {
            const flowerName = assetShopMap.flowers[flowerId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${quantity} ${
                    quantity > 1 ? pluralize(flowerName) : flowerName
                }`,

            })
        })
        return () => {
            socket?.off(ReceiverEventName.FlowerSeedsBought)
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