import { GRAPHQL_MUTATION_CURE_ANIMAL_SWR_MUTATION } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { useGraphQLMutationCureAnimalSwrMutation } from "@/hooks"
import { CureAnimalRequest } from "@/modules/apollo"

export const useCureAnimalEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationCureAnimalSwrMutation>
  >(GRAPHQL_MUTATION_CURE_ANIMAL_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(
            EventName.RequestCureAnimal,
            async (message: CureAnimalRequest) => {
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
                EventBus.emit(EventName.CureAnimalCompleted, completedMessage)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestCureAnimal)
        }
    }, [swrMutation])
}
