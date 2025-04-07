import { ExternalEventName, ExternalEventEmitter, SetPlacedItemInfoMessage } from "../../../events"
import { useEffect } from "react"
import { useAppDispatch, setPlacedItemId } from "@/redux"

export const usePlacedItemEffects = () => {
    const dispatch = useAppDispatch()
    // load inventory data
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.SetPlacedItemInfo, ({ placedItemId }: SetPlacedItemInfoMessage) => {
            dispatch(setPlacedItemId(placedItemId))
        })

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.SetPlacedItemInfo)
        }
    }, [dispatch])
}
