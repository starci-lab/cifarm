import { API_USE_PESTICIDE_SWR_MUTATION } from "@/app/constants"
import { useApiUsePesticideSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { UsePesticideRequest } from "@/modules/axios"

export const useUsePesticideEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUsePesticideSwrMutation>
      >(API_USE_PESTICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUsePesticide, async (message: UsePesticideRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.UsePesticideCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUsePesticide)
        }
    }, [swrMutation])
}