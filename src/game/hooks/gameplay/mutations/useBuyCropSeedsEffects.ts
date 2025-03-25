import { GAMEPLAY_IO } from "@/app/constants"
import { BuyCropSeedsMessage, ReceiverEventName, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { EmitterEventName } from "@/hooks"

export const useBuyCropSeedsEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyCropSeeds, async (message: BuyCropSeedsMessage) => {
            if (!socket) {
                return
            }
            socket.on(ReceiverEventName.CropSeedsBought, () => {
                EventBus.emit(EventName.BuyCropSeedsResponsed)
            })
            socket.emit(EmitterEventName.BuyCropSeeds, message)
            // return the user to the phaser game
        })
    
        return () => {
            socket?.off(ReceiverEventName.CropSeedsBought)
            EventBus.removeListener(EventName.RequestBuyCropSeeds)
        }
    }, [socket])
}