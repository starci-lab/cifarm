import { GRAPHQL_MUTATION_PLANT_SEED_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationPlantSeedSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { PlantSeedRequest } from "@/modules/apollo"

export const usePlantSeedEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationPlantSeedSwrMutation>
  >(GRAPHQL_MUTATION_PLANT_SEED_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(
            EventName.RequestPlantSeed,
            async (message: PlantSeedRequest) => {
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
                EventBus.emit(EventName.PlantSeedCompleted, completedMessage)
            }
        )
        return () => {
            EventBus.removeListener(EventName.RequestPlantSeed)
        }
    }, [swrMutation])
}
