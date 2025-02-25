import { API_BUY_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useApiBuyAnimalSwrMutation } from "@/hooks"
import { BuyAnimalRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useBuyAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiBuyAnimalSwrMutation>
      >(API_BUY_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyAnimal, async (message: BuyAnimalRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuyAnimalCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyAnimal)
        }
    }, [swrMutation])
}