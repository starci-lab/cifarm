import { GRAPHQL_MUTATION_BUY_FLOWER_SEEDS_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuyFlowerSeedsSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { BuyFlowerSeedsRequest } from "@/modules/apollo"

export const useBuyFlowerSeedsEffects = () => {
    //get the singleton instance of the buy seeds mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuyFlowerSeedsSwrMutation>
      >(GRAPHQL_MUTATION_BUY_FLOWER_SEEDS_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyFlowerSeeds, async (message: BuyFlowerSeedsRequest) => {
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
            EventBus.emit(EventName.BuyFlowerSeedsResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyCropSeeds)
        }
    }, [swrMutation])
}