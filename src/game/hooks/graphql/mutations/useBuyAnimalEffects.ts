import { GRAPHQL_MUTATION_BUY_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuyAnimalSwrMutation } from "@/hooks"
import { BuyAnimalRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"

export const useBuyAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuyAnimalSwrMutation>
      >(GRAPHQL_MUTATION_BUY_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyAnimal, async (message: BuyAnimalRequest) => {
            let completedMessage: CompletedMessage
            try {
                await swrMutation.trigger({ request: message })
                // return the user to the phaser game
                completedMessage = {
                    success: true
                }
            } catch (error) {
                console.error(error)
                completedMessage = {
                    success: false
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.BuyAnimalCompleted, completedMessage)
        })  
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyAnimal)
        }
    }, [swrMutation])
}