import { API_BUY_SEEDS_SWR_MUTATION } from "@/app/constants"
import { useApiUpdateTutorialSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../event-bus"

export const useBuySeedsEffect = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUpdateTutorialSwrMutation>
      >(API_BUY_SEEDS_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuySeeds, async () => {
            await swrMutation.trigger({})
            // return the user to the phaser game
            EventBus.emit(EventName.BuySeedsCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySeeds)
        }
    }, [swrMutation])
}