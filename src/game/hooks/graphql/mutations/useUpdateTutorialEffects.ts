import { GRAPHQL_MUTATION_UPDATE_TUTORIAL_SWR_MUTATION } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { useGraphQLMutationUpdateTutorialSwrMutation } from "@/hooks"

export const useUpdateTutorialEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationUpdateTutorialSwrMutation>
  >(GRAPHQL_MUTATION_UPDATE_TUTORIAL_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.RequestUpdateTutorial, async () => {
            let message: CompletedMessage
            try {
                await swrMutation.trigger({})
                message = {
                    success: true,
                }
            } catch (error) {
                console.error(error)
                message = {
                    success: false,
                }
            }
            EventBus.emit(EventName.UpdateTutorialCompleted, message)
        })

        return () => {
            EventBus.removeListener(EventName.RequestUpdateTutorial)
        }
    }, [swrMutation])
}
