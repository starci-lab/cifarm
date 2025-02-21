import { API_HELP_WATER_SWR_MUTATION } from "@/app/constants"
import { useApiHelpWaterSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { HelpWaterRequest } from "@/modules/axios"

export const useHelpWaterEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHelpWaterSwrMutation>
      >(API_HELP_WATER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpWater, async (message: HelpWaterRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpWaterCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpWater)
        }
    }, [swrMutation])
}