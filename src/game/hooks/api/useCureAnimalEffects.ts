import { API_CURE_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { CureAnimalRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { useApiCureAnimalSwrMutation } from "@/hooks"

export const useCureAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiCureAnimalSwrMutation>
      >(API_CURE_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestCureAnimal, async (message: CureAnimalRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.CureAnimalCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestCureAnimal)
        }
    }, [swrMutation])
}