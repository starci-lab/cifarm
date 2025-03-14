import { API_HARVEST_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useApiHarvestAnimalSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { HarvestAnimalRequest } from "@/modules/axios"

export const useHarvestAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiHarvestAnimalSwrMutation>
      >(API_HARVEST_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestAnimal, async (message: HarvestAnimalRequest) => {
            const response = await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HarvestAnimalCompleted, response.data)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestAnimal)
        }
    }, [swrMutation])
}