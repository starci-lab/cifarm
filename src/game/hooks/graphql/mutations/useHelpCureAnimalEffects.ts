import { GRAPHQL_MUTATION_HELP_CURE_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { HelpCureAnimalRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { useGraphQLMutationHelpCureAnimalSwrMutation } from "@/hooks"

export const useHelpCureAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpCureAnimalSwrMutation>
      >(GRAPHQL_MUTATION_HELP_CURE_ANIMAL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpCureAnimal, async (message: HelpCureAnimalRequest) => {
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
            EventBus.emit(EventName.HelpCureAnimalResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpCureAnimal)
        }
    }, [swrMutation])
}