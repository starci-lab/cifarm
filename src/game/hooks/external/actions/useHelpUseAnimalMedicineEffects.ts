import { GAMEPLAY_IO } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { useWs, EmitterEventName } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useHelpUseAnimalMedicineEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useWs>
    >(GAMEPLAY_IO)
    
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