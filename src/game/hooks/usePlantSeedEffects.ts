import { API_PLANT_SEED_SWR_MUTATION } from "@/app/constants"
import { useApiPlantSeedSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../event-bus"
import { PlantSeedRequest } from "@/modules/axios"

export const usePlantSeedEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiPlantSeedSwrMutation>
      >(API_PLANT_SEED_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestPlantSeed, async (message: PlantSeedRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.PlantSeedCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestPlantSeed)
        }
    }, [swrMutation])
}