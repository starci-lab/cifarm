import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
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
