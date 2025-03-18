import { GRAPHQL_MUTATION_HARVEST_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHarvestAnimalSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { HarvestAnimalRequest } from "@/modules/apollo"

export const useHarvestAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHarvestAnimalSwrMutation>
      >(GRAPHQL_MUTATION_HARVEST_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestAnimal, async (message: HarvestAnimalRequest) => {
            let completedMessage: CompletedMessage
            try {
                await swrMutation.trigger({ request: message })
                completedMessage = {
                    success: true,
                }
            } catch (error) {
                console.error(error)
                completedMessage = {
                    success: false,
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.HarvestAnimalCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestAnimal)
        }
    }, [swrMutation])
}