import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { useEffect } from "react"
import { useAppSelector } from "@/redux"

export const useStaticEffects = () => {
    //get the singleton instance of the static swr
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    // load static data
    useEffect(() => {
        if (!staticData) return
        ExternalEventEmitter.on(ExternalEventName.LoadStaticData, async () => {
            //load static data
            ExternalEventEmitter.emit(ExternalEventName.StaticDataLoaded, staticData)
        })
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.LoadStaticData)
        }
    }, [staticData])
}
