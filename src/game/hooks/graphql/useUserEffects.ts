import { QUERY_USER_SWR } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryUserSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
export const useUserEffects = () => {
    //get the singleton instance of the user swr
    const { swr } = useSingletonHook<ReturnType<typeof useQueryUserSwr>>(QUERY_USER_SWR)
    
    // load user data
    useEffect(() => {
        EventBus.on(EventName.LoadUser, async () => {
            //load user data
            const data = await swr.mutate()
            EventBus.emit(EventName.UserLoaded, data?.user)
        })

        return () => {
            EventBus.removeListener(EventName.LoadUser)
        }
    }, [swr])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshUser, async () => {
            //load user data
            const data = await swr.mutate()
            EventBus.emit(EventName.UserRefreshed, data?.user)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshUser)
        }
    }, [swr])
}