import { GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "@/game/events"
import { useGraphQLQueryUserSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useUserEffects = () => {
    //get the singleton instance of the user swr
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryUserSwr>>(
        GRAPHQL_QUERY_USER_SWR
    )

    // load user data
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.LoadUser, async () => {
            //load user data
            ExternalEventEmitter.emit(
                ExternalEventName.UserLoaded,
                swr.data?.data?.user
            )
        })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadUser)
        }
    }, [swr])
}
