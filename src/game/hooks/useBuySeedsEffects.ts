import { API_BUY_SEEDS_SWR_MUTATION } from "@/app/constants"
import { useApiBuySeedsSwrMutation, useApiUpdateTutorialSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../event-bus"
import { BuySeedsRequest } from "@/modules/axios"

export const useBuySeedsEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiBuySeedsSwrMutation>
      >(API_BUY_SEEDS_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuySeeds, async (message: BuySeedsRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuySeedsCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySeeds)
        }
    }, [swrMutation])
}