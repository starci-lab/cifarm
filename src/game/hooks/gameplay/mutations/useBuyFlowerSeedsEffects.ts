import { GAMEPLAY_IO } from "@/app/constants"
import { BuyFlowerSeedsMessage, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { EmitterEventName, ReceiverEventName } from "@/hooks"

export const useBuyFlowerSeedsEffects = () => {
    //get the singleton instance of the buy seeds mutation
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestBuyFlowerSeeds, async (message: BuyFlowerSeedsMessage) => {
            if (!socket) {
                return
            }
            socket.on(ReceiverEventName.FlowerSeedsBought, () => {
                EventBus.emit(EventName.BuyFlowerSeedsResponsed)
            })
            socket.emit(EmitterEventName.BuyFlowerSeeds, message)
            // return the user to the phaser
        })
    
        return () => {
            socket?.off(ReceiverEventName.FlowerSeedsBought)
            EventBus.removeListener(EventName.RequestBuyCropSeeds)
        }
    }, [socket])
}