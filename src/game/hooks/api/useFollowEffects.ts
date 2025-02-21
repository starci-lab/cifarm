import { API_FOLLOW_SWR_MUTATION } from "@/app/constants"
import { useApiFollowSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { FollowRequest } from "@/modules/axios"

export const useFollowEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiFollowSwrMutation>
      >(API_FOLLOW_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestFollow, async (message: FollowRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.FollowCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestFollow)
        }
    }, [swrMutation])
}