import { GRAPHQL_MUTATION_HELP_WATER_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useGraphQLMutationHelpWaterSwrMutation } from "@/hooks"
import { HelpWaterRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useHelpWaterEffects = () => {
    //get the singleton instance of the help water mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpWaterSwrMutation>
    >(GRAPHQL_MUTATION_HELP_WATER_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpWater, async (message: HelpWaterRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.HelpWaterCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpWater)
        }
    }, [swrMutation])
}