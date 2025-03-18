import { GRAPHQL_MUTATION_THIEF_CROP_SWR_MUTATION } from "@/app/constants"
import { CompletedMessage, EventBus, EventName } from "@/game/event-bus"
import { useGraphQLMutationThiefCropSwrMutation } from "@/hooks"
import { ThiefCropRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useThiefCropEffects = () => {
    //get the singleton instance of the thief crop mutation
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationThiefCropSwrMutation>
    >(GRAPHQL_MUTATION_THIEF_CROP_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestThiefCrop, async (message: ThiefCropRequest) => {
            let completedMessage: CompletedMessage
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
            EventBus.emit(EventName.ThiefCropCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestThiefCrop)
        }
    }, [swrMutation])
}