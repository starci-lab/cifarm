import { ExternalEventName, ExternalEventEmitter } from "@/modules/event-emitter"
import { useEffect } from "react"
import { useAppSelector } from "@/redux"

export const useInventoriesEffects = () => {
    //get the singleton instance of the user swr
    const inventories = useAppSelector((state) => state.apiReducer.coreApi.inventories)
    // load inventory data
    useEffect(() => {
        if (!inventories) return
        ExternalEventEmitter.on(ExternalEventName.LoadInventories, async () => {
            //load inventory data
            ExternalEventEmitter.emit(
                ExternalEventName.InventoriesLoaded,
                inventories
            )
        })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadInventories)
        }
    }, [inventories])
}
