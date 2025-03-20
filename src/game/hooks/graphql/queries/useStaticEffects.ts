import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useStaticEffects = () => {
    //get the singleton instance of the static swr
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    // load static data
    useEffect(() => {
        EventBus.on(EventName.LoadStaticData, async () => {
            //load static data
            EventBus.emit(EventName.StaticDataLoaded, swr.data?.data)
        })

        return () => {
            EventBus.removeListener(EventName.LoadStaticData)
        }
    }, [swr])
}
