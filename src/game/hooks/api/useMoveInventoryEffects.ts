import { API_MOVE_INVENTORY_SWR_MUTATION } from "@/app/constants"
import { useApiMoveInventorySwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { MoveInventoryRequest } from "@/modules/axios"

export const useMoveInventoryEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiMoveInventorySwrMutation>
      >(API_MOVE_INVENTORY_SWR_MUTATION)
    
    //user swr
    useEffect(() => {
        EventBus.on(EventName.RequestMoveInventory, async (message: MoveInventoryRequest) => {
            await swrMutation.trigger({ request: message })
            EventBus.emit(EventName.MoveInventoryCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestMoveInventory)
        }
    }, [swrMutation])
}