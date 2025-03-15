import { API_THIEF_FRUIT_SWR_MUTATION } from "@/app/constants"
import { useApiThiefFruitSwrMutation } from "@/hooks"
import { ThiefFruitRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useThiefFruitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiThiefFruitSwrMutation>
      >(API_THIEF_FRUIT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefFruit, async (message: ThiefFruitRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.ThiefFruitCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefFruit)
        }
    }, [swrMutation])
}