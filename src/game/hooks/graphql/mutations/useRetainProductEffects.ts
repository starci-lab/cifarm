import { GRAPHQL_MUTATION_RETAIN_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationRetainProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { RetainProductRequest } from "@/modules/apollo"

export const useRetainProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationRetainProductSwrMutation>
      >(GRAPHQL_MUTATION_RETAIN_PRODUCT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestRetainProduct, async (message: RetainProductRequest) => {
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
            // return the user to the phaser game
            EventBus.emit(EventName.RetainProductCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestRetainProduct)
        }
    }, [swrMutation])
}