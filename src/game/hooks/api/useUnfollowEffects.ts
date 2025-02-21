import { API_UNFOLLOW_SWR_MUTATION } from "@/app/constants"
import { useApiUnfollowSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { UnfollowRequest } from "@/modules/axios"

export const useUnfollowEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUnfollowSwrMutation>
      >(API_UNFOLLOW_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUnfollow, async (message: UnfollowRequest) => {
            console.log("Unfollowing user")
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.UnfollowCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUnfollow)
        }
    }, [swrMutation])
}