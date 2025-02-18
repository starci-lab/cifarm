import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryStaticSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useStaticEffects = () => {
    //static data useEffect
    const { swrMutation } =
        useSingletonHook<ReturnType<typeof useQueryStaticSwrMutation>>(QUERY_STATIC_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.LoadStaticData, async () => {
            const { data } = await swrMutation.trigger()
            EventBus.emit(EventName.StaticDataLoaded, data)
        })
        return () => {
            //remove listeners
            EventBus.removeListener(EventName.LoadStaticData)
        }
    }, [swrMutation])
}