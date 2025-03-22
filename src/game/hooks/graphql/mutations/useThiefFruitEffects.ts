import { GRAPHQL_MUTATION_THIEF_FRUIT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationThiefFruitSwrMutation } from "@/hooks"
import { ThiefFruitRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useThiefFruitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationThiefFruitSwrMutation>
      >(GRAPHQL_MUTATION_THIEF_FRUIT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefFruit, async (message: ThiefFruitRequest) => {
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
            EventBus.emit(EventName.ThiefFruitResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefFruit)
        }
    }, [swrMutation])
}