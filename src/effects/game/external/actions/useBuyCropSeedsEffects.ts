import { WS } from "@/singleton"
import { BuyCropSeedsMessage, EmitterEventName, ReceiverEventName, useWs, toast } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { assetShopMap } from "@/modules/assets"
import pluralize from "pluralize"
import { setShopCrop } from "@/redux"
import { useAppDispatch } from "@/redux"

export const useBuyCropSeedsEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!socket) return
        socket?.on(ReceiverEventName.BuyCropSeedsResponsed, (message: BuyCropSeedsMessage) => {
            const { quantity, cropId } = message
            const cropName = assetShopMap.crops[cropId]?.name?.toLowerCase() ?? ""
            toast({
                title: `Bought ${quantity} ${
                    quantity > 1 ? pluralize(cropName) : cropName
                }`,
            })
            dispatch(setShopCrop({ cropId, isLoading: false }))
        })

        return () => {
            socket?.off(ReceiverEventName.BuyCropSeedsResponsed)
        }
    }, [socket])
    
    useEffect(() => {
        if (!socket) return
        ExternalEventEmitter.on(ExternalEventName.RequestBuyCropSeeds, async (message: BuyCropSeedsMessage) => {
            console.log("request buy crop seeds")
            socket?.emit(EmitterEventName.BuyCropSeeds, message)
            // return the user to the phaser game
        })
    
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestBuyCropSeeds)
        }
    }, [socket])
}