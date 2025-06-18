import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import { useAppDispatch, setPlacedItems } from "@/redux"
import { useAppSelector } from "@/redux"

export const usePlacedItemsEffects = () => {
    //get the singleton instance of the user swr
    const placedItems = useAppSelector(
        (state) => state.apiReducer.coreApi.placedItems
    )
    const dispatch = useAppDispatch()
    // load placed items data
    useEffect(() => {
        if (!placedItems) return
        ExternalEventEmitter.on(
            ExternalEventName.LoadPlacedItems,
            async () => {
                dispatch(setPlacedItems(placedItems))
                ExternalEventEmitter.emit(
                    ExternalEventName.PlacedItemsLoaded,
                    placedItems
                )
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadPlacedItems)
        }
    }, [placedItems])

    // load inventory data
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.LoadPlacedItems,
            async () => {
                ExternalEventEmitter.emit(
                    ExternalEventName.PlacedItemsLoaded,
                    placedItems
                )
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadPlacedItems)
        }
    }, [placedItems])
}
