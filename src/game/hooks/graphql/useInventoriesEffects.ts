import { QUERY_INVENTORIES_SWR } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryInventoriesSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useInventoriesEffects = () => {
    //get the singleton instance of the user swr
    const { swr } = useSingletonHook<ReturnType<typeof useQueryInventoriesSwr>>(QUERY_INVENTORIES_SWR)
    
    // load user data
    useEffect(() => {
        EventBus.on(EventName.LoadInventories, async () => {
            //load user data
            const data = await swr.mutate()
            EventBus.emit(EventName.InventoriesLoaded, data?.inventories.data)
        })

        return () => {
            EventBus.removeListener(EventName.LoadInventories)
        }
    }, [swr])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshInventories, async () => {
            //load user data
            const data = await swr.mutate()
            EventBus.emit(EventName.InventoriesRefreshed, data?.inventories.data)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshInventories)
        }
    }, [swr])
}