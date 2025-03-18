import { GRAPHQL_MUTATION_BUY_SUPPLIES_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuySuppliesSwrMutation } from "@/hooks"
import { BuySuppliesRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useBuySuppliesEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuySuppliesSwrMutation>
      >(GRAPHQL_MUTATION_BUY_SUPPLIES_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuySupplies, async (message: BuySuppliesRequest) => {
            let completedMessage: CompletedMessage
            try {
                await swrMutation.trigger({ request: message })
                // return the user to the phaser game
                completedMessage = {
                    success: true,
                }
            } catch (error) {
                console.error(error)
                completedMessage = {
                    success: false
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.BuySuppliesCompleted, completedMessage)
        })  
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySupplies)
        }
    }, [swrMutation])
}