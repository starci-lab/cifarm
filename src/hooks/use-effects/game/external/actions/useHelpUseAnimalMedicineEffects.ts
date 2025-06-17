import { WS } from "@/app/(core)/constantsd"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { useWs, EmitterEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useHelpUseAnimalMedicineEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(WS)
    
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestHelpUseAnimalMedicine, async () => {
            if (!socket) {
                return
            }
            socket.emit(EmitterEventName.HelpUseAnimalMedicine)
        })
        
    
        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.RequestHelpUseAnimalMedicine)
        }
    }, [socket])
}