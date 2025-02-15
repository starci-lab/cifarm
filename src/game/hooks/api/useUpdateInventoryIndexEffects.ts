import { API_UPDATE_INVENTORY_INDEX_SWR_MUTATION } from "@/app/constants"
import { useApiUpdateInventoryIndexSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { UpdateInventoryIndexRequest } from "@/modules/axios"

export const useUpdateInventoryIndexEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiUpdateInventoryIndexSwrMutation>
      >(API_UPDATE_INVENTORY_INDEX_SWR_MUTATION)
    
    //user swr
    useEffect(() => {
        EventBus.on(EventName.RequestUpdateInventoryIndex, async (message: UpdateInventoryIndexRequest) => {
            await swrMutation.trigger({ request: message })
            EventBus.emit(EventName.UpdateInventoryIndexCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUpdateInventoryIndex)
        }
    }, [swrMutation])
}