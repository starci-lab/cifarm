import { API_MOVE_SWR_MUTATION } from "@/app/constants"
import { useApiMoveSwrMutation } from "@/hooks"
import { MoveRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useMoveEffects = () => {
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiMoveSwrMutation>
      >(API_MOVE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestMove, async (message: MoveRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.MoveCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestMove)
        }
    }, [swrMutation])
}