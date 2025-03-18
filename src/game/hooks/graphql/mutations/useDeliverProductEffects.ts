import { GRAPHQL_MUTATION_DELIVER_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationDeliverProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { DeliverProductRequest } from "@/modules/apollo"

export const useDeliverProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationDeliverProductSwrMutation>
      >(GRAPHQL_MUTATION_DELIVER_PRODUCT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestDeliverProduct, async (message: DeliverProductRequest) => {
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
            EventBus.emit(EventName.DeliverProductCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestDeliverProduct)
        }
    }, [swrMutation])
}