import { GRAPHQL_MUTATION_USE_HERBICIDE_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { HelpUseHerbicideRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useGraphQLMutationUseHerbicideSwrMutation } from "@/hooks"

export const useHelpUseHerbicideEffects = () => {
    //get the singleton instance of the help use herbicide mutation
    const { swrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationUseHerbicideSwrMutation>>(GRAPHQL_MUTATION_USE_HERBICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseHerbicide, async (message: HelpUseHerbicideRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpUseHerbicideCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseHerbicide)
        }
    }, [swrMutation])
}