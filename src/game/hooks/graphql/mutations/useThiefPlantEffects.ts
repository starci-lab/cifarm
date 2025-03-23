import { GRAPHQL_MUTATION_THIEF_PLANT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationThiefPlantSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { ThiefPlantRequest } from "@/modules/apollo"

export const useThiefPlantEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationThiefPlantSwrMutation>
      >(GRAPHQL_MUTATION_THIEF_PLANT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefPlant, async (message: ThiefPlantRequest) => {
            let completedMessage: ResponsedMessage
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
            EventBus.emit(EventName.ThiefPlantResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefPlant)
        }
    }, [swrMutation])
}