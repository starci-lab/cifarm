import { GRAPHQL_MUTATION_VISIT_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationVisitSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { VisitRequest } from "@/modules/apollo"

export const useVisitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationVisitSwrMutation>
      >(GRAPHQL_MUTATION_VISIT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestVisit, async (message: VisitRequest) => {
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
            EventBus.emit(EventName.VisitCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestVisit)
        }
    }, [swrMutation])
}