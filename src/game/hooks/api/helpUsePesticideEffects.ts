import { API_HELP_USE_PESTICIDE_SWR_MUTATION } from "@/app/constants"
import { useApiHelpUsePesticideSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { HelpUsePesticideRequest } from "@/modules/axios"

export const useHelpUsePesticideEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHelpUsePesticideSwrMutation>
      >(API_HELP_USE_PESTICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUsePesticide, async (message: HelpUsePesticideRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpUsePesticideCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUsePesticide)
        }
    }, [swrMutation])
}