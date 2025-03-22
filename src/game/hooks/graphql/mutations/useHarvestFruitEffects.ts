import { GRAPHQL_MUTATION_HARVEST_FRUIT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHarvestFruitSwrMutation } from "@/hooks"
import { HarvestFruitRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useHarvestFruitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHarvestFruitSwrMutation>
      >(GRAPHQL_MUTATION_HARVEST_FRUIT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHarvestFruit, async (message: HarvestFruitRequest) => {
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
            EventBus.emit(EventName.HarvestFruitResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHarvestFruit)
        }
    }, [swrMutation])
}