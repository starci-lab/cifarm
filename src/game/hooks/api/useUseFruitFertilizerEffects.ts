import { API_USE_FRUIT_FERTILIZER_SWR_MUTATION } from "@/app/constants"
import { useApiUseFruitFertilizerSwrMutation } from "@/hooks"
import { UseFruitFertilizerRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useUseFruitFertilizerEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUseFruitFertilizerSwrMutation>
      >(API_USE_FRUIT_FERTILIZER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseFruitFertilizer, async (message: UseFruitFertilizerRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.UseFruitFertilizerCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseFruitFertilizer)
        }
    }, [swrMutation])
}