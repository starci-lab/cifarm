import { API_HARVEST_FRUIT_SWR_MUTATION } from "@/app/constants"
import { useApiHarvestFruitSwrMutation } from "@/hooks"
import { HarvestFruitRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useHarvestFruitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHarvestFruitSwrMutation>
      >(API_HARVEST_FRUIT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestFruit, async (message: HarvestFruitRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HarvestFruitCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestFruit)
        }
    }, [swrMutation])
}