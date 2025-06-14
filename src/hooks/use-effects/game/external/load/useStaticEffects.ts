import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/(core)/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
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
        ExternalEventEmitter.on(ExternalEventName.LoadStaticData, async () => {
            //load static data
            ExternalEventEmitter.emit(ExternalEventName.StaticDataLoaded, swr.data?.data)
        })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadStaticData)
        }
    }, [swr])
}
