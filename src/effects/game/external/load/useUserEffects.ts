import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { useEffect } from "react"
import { useAppSelector } from "@/redux"

export const useUserEffects = () => {
    //get the singleton instance of the user swr
    const user = useAppSelector((state) => state.apiReducer.coreApi.user)

    // load user data
    useEffect(() => {
        if (!user) return
        ExternalEventEmitter.on(ExternalEventName.LoadUser, async () => {
            //load user data
            ExternalEventEmitter.emit(
                ExternalEventName.UserLoaded,
                user
            )
        })
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadUser)
        }
    }, [user])
}
