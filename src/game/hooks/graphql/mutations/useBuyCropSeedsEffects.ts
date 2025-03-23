import { GRAPHQL_MUTATION_BUY_CROP_SEEDS_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuyCropSeedsSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { BuyCropSeedsRequest } from "@/modules/apollo"

export const useBuyCropSeedsEffects = () => {
    //get the singleton instance of the buy seeds mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuyCropSeedsSwrMutation>
      >(GRAPHQL_MUTATION_BUY_CROP_SEEDS_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyCropSeeds, async (message: BuyCropSeedsRequest) => {
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
            EventBus.emit(EventName.BuyCropSeedsResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyCropSeeds)
        }
    }, [swrMutation])
}