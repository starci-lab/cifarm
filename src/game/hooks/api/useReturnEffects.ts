import { API_RETURN_SWR_MUTATION } from "@/app/constants"
import { useApiReturnSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useReturnEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiReturnSwrMutation>
      >(API_RETURN_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.RequestReturn, async () => {
            await swrMutation.trigger({})
            EventBus.emit(EventName.ReturnCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestReturn)
        }
    }, [swrMutation])
}