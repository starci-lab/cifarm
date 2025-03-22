import { GRAPHQL_MUTATION_DELIVER_MORE_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationDeliverMoreProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { DeliverMoreProductRequest } from "@/modules/apollo"

export const useDeliverMoreProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationDeliverMoreProductSwrMutation>
  >(GRAPHQL_MUTATION_DELIVER_MORE_PRODUCT_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(
            EventName.RequestDeliverMoreProduct,
            async (message: DeliverMoreProductRequest) => {
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
                EventBus.emit(EventName.DeliverMoreProductResponsed, completedMessage)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestDeliverMoreProduct)
        }
    }, [swrMutation])
}
