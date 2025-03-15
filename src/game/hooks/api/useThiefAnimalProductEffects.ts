import { API_THIEF_ANIMAL_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useApiThiefAnimalProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { ThiefAnimalProductRequest } from "@/modules/axios"

export const useThiefAnimalProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiThiefAnimalProductSwrMutation>
      >(API_THIEF_ANIMAL_PRODUCT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefAnimalProduct, async (message: ThiefAnimalProductRequest) => {
            const response = await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.ThiefAnimalProductCompleted, response.data)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefAnimalProduct)
        }
    }, [swrMutation])
}