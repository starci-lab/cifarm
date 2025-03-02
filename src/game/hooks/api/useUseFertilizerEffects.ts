import { useApiUseFertilizerSwrMutation } from "@/hooks"
import { UseFertilizerRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { API_USE_FERTILIZER_SWR_MUTATION } from "@/app/constants"

export const useUseFertilizerEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUseFertilizerSwrMutation>
      >(API_USE_FERTILIZER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseFertilizer, async (message: UseFertilizerRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.UseFertilizerCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseFertilizer)
        }
    }, [swrMutation])
}