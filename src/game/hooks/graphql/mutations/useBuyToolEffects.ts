import { GRAPHQL_MUTATION_BUY_TOOL_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuyToolSwrMutation } from "@/hooks"
import { BuyToolRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useBuyToolEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuyToolSwrMutation>
      >(GRAPHQL_MUTATION_BUY_TOOL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyTool, async (message: BuyToolRequest) => {
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
            EventBus.emit(EventName.BuyToolCompleted, completedMessage)
        })

        return () => {
            EventBus.removeListener(EventName.RequestBuyTool)
        }
    }, [swrMutation])
}