import { API_HELP_USE_BUG_NET_SWR_MUTATION } from "@/app/constants"
import { useApiHelpUseBugNetSwrMutation } from "@/hooks"
import { HelpUseBugNetRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useHelpUseBugNetEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHelpUseBugNetSwrMutation>
      >(API_HELP_USE_BUG_NET_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseBugNet, async (message: HelpUseBugNetRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpUseBugNetCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseBugNet)
        }
    }, [swrMutation])
}