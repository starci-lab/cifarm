import { GRAPHQL_MUTATION_BUY_SEEDS_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuySeedsSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { BuySeedsRequest } from "@/modules/axios"

export const useBuySeedsEffects = () => {
    //get the singleton instance of the buy seeds mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuySeedsSwrMutation>
      >(GRAPHQL_MUTATION_BUY_SEEDS_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuySeeds, async (message: BuySeedsRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuySeedsCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySeeds)
        }
    }, [swrMutation])
}