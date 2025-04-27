import {
    ExternalEventName,
    ExternalEventEmitter,
    SetPlacedItemInfoMessage,
} from "@/modules/event-emitter"
import { useEffect } from "react"
import { useAppDispatch, setPlacedItem } from "@/redux"

export const usePlacedItemEffects = () => {
    const dispatch = useAppDispatch()
    // load inventory data
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.SetPlacedItemInfo,
            ({ placedItem }: SetPlacedItemInfoMessage) => {
                dispatch(setPlacedItem(placedItem))
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.SetPlacedItemInfo)
        }
    }, [dispatch])
}
