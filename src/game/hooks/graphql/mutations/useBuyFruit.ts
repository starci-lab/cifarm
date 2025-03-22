import { GRAPHQL_MUTATION_BUY_FRUIT_SWR_MUTATION } from "@/app/constants"
import { BuyFruitRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { useGraphQLMutationBuyFruitSwrMutation } from "@/hooks"

export const useBuyFruitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationBuyFruitSwrMutation>
  >(GRAPHQL_MUTATION_BUY_FRUIT_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.RequestBuyFruit, async (message: BuyFruitRequest) => {
            let completedMessage: ResponsedMessage
            try {
                await swrMutation.trigger({ request: message })
                // return the user to the phaser game
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
            EventBus.emit(EventName.BuyFruitResponsed, completedMessage)
        })

        return () => {
            EventBus.removeListener(EventName.RequestBuyFruit)
        }
    }, [swrMutation])
}
