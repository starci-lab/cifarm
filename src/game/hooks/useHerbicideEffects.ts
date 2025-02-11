import { API_USE_HERBICIDE_SWR_MUTATION } from "@/app/constants"
import { useApiUseHerbicideSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../event-bus"
import { UseHerbicideRequest } from "@/modules/axios"

export const useUseHerbicideEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUseHerbicideSwrMutation>
      >(API_USE_HERBICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuySeeds, async (message: UseHerbicideRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuySeedsCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySeeds)
        }
    }, [swrMutation])
}