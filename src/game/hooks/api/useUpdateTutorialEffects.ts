import { API_UPDATE_TUTORIAL_SWR_MUTATION, QUERY_USER_SWR } from "@/app/constants"
import { useApiUpdateTutorialSwrMutation, useQueryUserSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useUpdateTutorialEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUpdateTutorialSwrMutation>
      >(API_UPDATE_TUTORIAL_SWR_MUTATION)
    
    //user swr
    const { swr: userSwr } = useSingletonHook<ReturnType<typeof useQueryUserSwr>>(QUERY_USER_SWR) 
    useEffect(() => {
        EventBus.on(EventName.RequestUpdateTutorial, async () => {
            await swrMutation.trigger({})
            const response = await userSwr.mutate()
            if (!response) {
                throw new Error("User not found")
            }
            // return the user to the phaser game
            EventBus.emit(EventName.UpdateTutorialCompleted, response.user)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUpdateTutorial)
        }
    }, [swrMutation, userSwr])
}