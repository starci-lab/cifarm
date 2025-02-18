import { QUERY_INVENTORIES_SWR_MUTATION } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryInventoriesSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useInventoriesEffects = () => {
    //get the singleton instance of the user swr
    const { swrMutation } = useSingletonHook<ReturnType<typeof useQueryInventoriesSwrMutation>>(QUERY_INVENTORIES_SWR_MUTATION)
    
    // load user data
    useEffect(() => {
        EventBus.on(EventName.LoadInventories, async () => {
            //load user data
            const { data } = await swrMutation.trigger({})
            EventBus.emit(EventName.InventoriesLoaded, data.inventories)
        })

        return () => {
            EventBus.removeListener(EventName.LoadInventories)
        }
    }, [swrMutation])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshInventories, async () => {
            //load user data
            const { data } = await swrMutation.trigger({})
            EventBus.emit(EventName.InventoriesRefreshed, data.inventories)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshInventories)
        }
    }, [swrMutation])
}