import { QUERY_USER_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryUserSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useUserEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<ReturnType<typeof useQueryUserSwrMutation>>(QUERY_USER_SWR_MUTATION)
    
    // load user data
    useEffect(() => {
        EventBus.on(EventName.LoadUser, async () => {
            //load user data
            const { data } = await swrMutation.trigger({})
            EventBus.emit(EventName.UserLoaded, data.user)
        })

        return () => {
            EventBus.removeListener(EventName.LoadUser)
        }
    }, [swrMutation])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshUser, async () => {
            const { data } = await swrMutation.trigger({})
            console.log("EventName.RefreshUser", data.user)
            //load user data
            EventBus.emit(EventName.UserRefreshed, data.user)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshUser)
        }
    }, [swrMutation])
}