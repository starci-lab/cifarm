import { API_USE_BUG_NET_SWR_MUTATION } from "@/app/constants"
import { useApiUseBugNetSwrMutation } from "@/hooks"
import { UseBugNetRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useUseBugNetEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUseBugNetSwrMutation>
      >(API_USE_BUG_NET_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseBugNet, async (message: UseBugNetRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.UseBugNetCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseBugNet)
        }
    }, [swrMutation])
}