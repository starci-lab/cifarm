import { GRAPHQL_MUTATION_SELL_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationSellSwrMutation } from "@/hooks"
import { SellRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useSellEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationSellSwrMutation>
      >(GRAPHQL_MUTATION_SELL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestSell, async (message: SellRequest) => {
            let completedMessage: CompletedMessage
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
            EventBus.emit(EventName.SellCompleted, completedMessage)
        })
        
        return () => {
            EventBus.removeListener(EventName.RequestSell)
        }
    }, [swrMutation])
}