import { API_HELP_USE_HERBICIDE_SWR_MUTATION } from "@/app/constants"
import { useApiHelpUseHerbicideSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { HelpUseHerbicideRequest } from "@/modules/axios"

export const useHelpUseHerbicideEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHelpUseHerbicideSwrMutation>
      >(API_HELP_USE_HERBICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseHerbicide, async (message: HelpUseHerbicideRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpUseHerbicideCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseHerbicide)
        }
    }, [swrMutation])
}