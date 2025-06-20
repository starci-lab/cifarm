import {
    ExternalEventName,
    ExternalEventEmitter,
    SetPlacedItemInfoMessage,
} from "@/modules/event-emitter"
import { useEffect } from "react"
import { useAppDispatch, setSelectedPlacedItemId } from "@/redux"

export const useSetPlacedItemEffects = () => {
    const dispatch = useAppDispatch()
    // load inventory data
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.SetPlacedItemInfo,
            ({ id }: SetPlacedItemInfoMessage) => {
                console.log("set placed item info")
                dispatch(setSelectedPlacedItemId(id))
            }
        )
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.SetPlacedItemInfo)
        }
    }, [dispatch])
}
