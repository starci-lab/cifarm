import { GRAPHQL_MUTATION_THIEF_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationThiefAnimalSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { ThiefAnimalRequest } from "@/modules/apollo"

export const useThiefAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationThiefAnimalSwrMutation>
      >(GRAPHQL_MUTATION_THIEF_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefAnimal, async (message: ThiefAnimalRequest) => {
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
            EventBus.emit(EventName.ThiefAnimalResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefAnimal)
        }
    }, [swrMutation])
}