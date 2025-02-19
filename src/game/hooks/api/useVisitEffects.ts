import { API_VISIT_SWR_MUTATION } from "@/app/constants"
import { useApiVisitSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { VisitRequest } from "@/modules/axios"

export const useVisitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiVisitSwrMutation>
      >(API_VISIT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestVisit, async (message: VisitRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.VisitCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestVisit)
        }
    }, [swrMutation])
}