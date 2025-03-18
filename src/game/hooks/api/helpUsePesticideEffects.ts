import { GRAPHQL_MUTATION_HELP_USE_PESTICIDE_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLMutationHelpUsePesticideSwrMutation } from "@/hooks"
import { HelpUsePesticideRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useHelpUsePesticideEffects = () => {
    //get the singleton instance of the help use pesticide mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUsePesticideSwrMutation>
    >(GRAPHQL_MUTATION_HELP_USE_PESTICIDE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUsePesticide, async (message: HelpUsePesticideRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpUsePesticideCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUsePesticide)
        }
    }, [swrMutation])
}