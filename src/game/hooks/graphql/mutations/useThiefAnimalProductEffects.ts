import { GRAPHQL_MUTATION_THIEF_ANIMAL_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationThiefAnimalProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { ThiefAnimalProductRequest } from "@/modules/apollo"

export const useThiefAnimalProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationThiefAnimalProductSwrMutation>
      >(GRAPHQL_MUTATION_THIEF_ANIMAL_PRODUCT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefAnimalProduct, async (message: ThiefAnimalProductRequest) => {
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
            EventBus.emit(EventName.ThiefAnimalProductCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefAnimalProduct)
        }
    }, [swrMutation])
}