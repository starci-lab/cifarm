import { WS } from "@/app/constants"
import { BuyCropSeedsMessage, EmitterEventName, ReceiverEventName, useWs, CropSeedsBoughtMessage, toast } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
import { assetShopMap } from "@/modules/assets"
import pluralize from "pluralize"

export const useBuyCropSeedsEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        socket?.on(ReceiverEventName.CropSeedsBought, ({
            quantity,
            cropId,
        }: CropSeedsBoughtMessage) => {
            const cropName = assetShopMap.crops[cropId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${quantity} ${
                    quantity > 1 ? pluralize(cropName) : cropName
                }`,
            })
        })

        return () => {
            socket?.off(ReceiverEventName.CropSeedsBought)
        }
    }, [socket])
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestBuyCropSeeds, async (message: BuyCropSeedsMessage) => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.BuyCropSeeds, message)
            // return the user to the phaser game
        })
    
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyCropSeeds)
        }
    }, [socket])
}