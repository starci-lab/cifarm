import { GRAPHQL_MUTATION_BUY_SEEDS_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuySeedsSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { BuySeedsRequest } from "@/modules/apollo"

export const useBuySeedsEffects = () => {
    //get the singleton instance of the buy seeds mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuySeedsSwrMutation>
      >(GRAPHQL_MUTATION_BUY_SEEDS_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuySeeds, async (message: BuySeedsRequest) => {
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
            EventBus.emit(EventName.BuySeedsResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySeeds)
        }
    }, [swrMutation])
}