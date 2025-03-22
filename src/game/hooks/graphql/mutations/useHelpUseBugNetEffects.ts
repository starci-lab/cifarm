import { GRAPHQL_MUTATION_HELP_USE_BUG_NET_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpUseBugNetSwrMutation } from "@/hooks"
import { HelpUseBugNetRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useHelpUseBugNetEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUseBugNetSwrMutation>
      >(GRAPHQL_MUTATION_HELP_USE_BUG_NET_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseBugNet, async (message: HelpUseBugNetRequest) => {
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
            EventBus.emit(EventName.HelpUseBugNetResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseBugNet)
        }
    }, [swrMutation])
}