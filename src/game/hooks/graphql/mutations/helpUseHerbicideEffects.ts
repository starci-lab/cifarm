import { GRAPHQL_MUTATION_HELP_USE_HERBICIDE_SWR_MUTATION } from "@/app/constants"
import { ResponsedMessage, EventBus, EventName } from "@/game/event-bus"
import { HelpUseHerbicideRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useGraphQLMutationHelpUseHerbicideSwrMutation } from "@/hooks"

export const useHelpUseHerbicideEffects = () => {
    //get the singleton instance of the help use herbicide mutation
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationHelpUseHerbicideSwrMutation>
  >(GRAPHQL_MUTATION_HELP_USE_HERBICIDE_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(
            EventName.RequestHelpUseHerbicide,
            async (message: HelpUseHerbicideRequest) => {
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
                EventBus.emit(EventName.HelpUseHerbicideResponsed, completedMessage)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestHelpUseHerbicide)
        }
    }, [swrMutation])
}
