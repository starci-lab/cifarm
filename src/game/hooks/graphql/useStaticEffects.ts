import { GRAPHQL_QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLQueryStaticSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useStaticEffects = () => {
    //get the singleton instance of the static swr
    const { swrMutation } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwrMutation>>(
        GRAPHQL_QUERY_STATIC_SWR_MUTATION,
    )

    // load static data
    useEffect(() => {
        EventBus.on(EventName.LoadStaticData, async () => {
            //load static data
            const { data } = await swrMutation.trigger()
            EventBus.emit(EventName.StaticDataLoaded, data)
        })

        return () => {
            EventBus.removeListener(EventName.LoadStaticData)
        }
    }, [swrMutation])
}