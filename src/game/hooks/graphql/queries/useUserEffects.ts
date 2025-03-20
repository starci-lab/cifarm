import { GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
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
        EventBus.on(EventName.LoadUser, async () => {
            //load user data
            EventBus.emit(EventName.UserLoaded, swr.data?.data?.user)
        })

        return () => {
            EventBus.removeListener(EventName.LoadUser)
        }
    }, [swr])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshUser, async () => {
            const response = await swr.mutate()
            //load user data
            EventBus.emit(EventName.UserRefreshed, response?.data?.user)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshUser)
        }
    }, [swr])
}
