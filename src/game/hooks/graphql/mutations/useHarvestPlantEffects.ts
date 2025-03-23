import { GRAPHQL_MUTATION_HARVEST_PLANT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHarvestPlantSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { HarvestPlantRequest } from "@/modules/apollo"

export const useHarvestPlantEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHarvestPlantSwrMutation>
      >(GRAPHQL_MUTATION_HARVEST_PLANT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestPlant, async (message: HarvestPlantRequest) => {
            let completedMessage: ResponsedMessage
            try {
                // Call API
                await swrMutation.trigger({ request: message })
                // return success
                completedMessage = {
                    success: true
                }  
            } catch (error) {
                console.error(error)
                // return error
                completedMessage = {
                    success: false
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.HarvestPlantResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestPlant)
        }
    }, [swrMutation])
}