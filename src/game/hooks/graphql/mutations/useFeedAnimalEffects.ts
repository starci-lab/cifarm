import { GRAPHQL_MUTATION_FEED_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationFeedAnimalSwrMutation } from "@/hooks"
import { FeedAnimalRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useFeedAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationFeedAnimalSwrMutation>
      >(GRAPHQL_MUTATION_FEED_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestFeedAnimal, async (message: FeedAnimalRequest) => {
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
            EventBus.emit(EventName.FeedAnimalResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestFeedAnimal)
        }
    }, [swrMutation])
}