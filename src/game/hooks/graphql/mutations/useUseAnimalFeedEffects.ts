import { GRAPHQL_MUTATION_USE_ANIMAL_FEED_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationUseAnimalFeedSwrMutation } from "@/hooks"
import { UseAnimalFeedRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useUseAnimalFeedEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUseAnimalFeedSwrMutation>
      >(GRAPHQL_MUTATION_USE_ANIMAL_FEED_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUseAnimalFeed, async (message: UseAnimalFeedRequest) => {
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
            // return the user to the phaser game
            EventBus.emit(EventName.UseAnimalFeedResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUseAnimalFeed)
        }
    }, [swrMutation])
}