import { API_HELP_USE_FRUIT_FERTILIZER_SWR_MUTATION } from "@/app/constants"
import { useApiHelpUseFruitFertilizerSwrMutation } from "@/hooks"
import { HelpUseFruitFertilizerRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useHelpUseFruitFertilizerEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHelpUseFruitFertilizerSwrMutation>
      >(API_HELP_USE_FRUIT_FERTILIZER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseFruitFertilizer, async (message: HelpUseFruitFertilizerRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpUseFruitFertilizerCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseFruitFertilizer)
        }
    }, [swrMutation])
}