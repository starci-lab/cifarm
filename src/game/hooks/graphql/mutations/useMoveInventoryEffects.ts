import { GRAPHQL_MUTATION_MOVE_INVENTORY_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationMoveInventorySwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { CompletedMessage, EventBus, EventName } from "../../../event-bus"
import { MoveInventoryRequest } from "@/modules/apollo"

export const useMoveInventoryEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationMoveInventorySwrMutation>
      >(GRAPHQL_MUTATION_MOVE_INVENTORY_SWR_MUTATION)
    
    //user swr
    useEffect(() => {
        EventBus.on(EventName.RequestMoveInventory, async (message: MoveInventoryRequest) => {
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
            EventBus.emit(EventName.MoveInventoryCompleted, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestMoveInventory)
        }
    }, [swrMutation])
}