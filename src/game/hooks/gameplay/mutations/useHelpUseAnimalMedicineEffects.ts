import { GAMEPLAY_IO } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { useGameplayIo } from "@/hooks"

export const useHelpUseAnimalMedicineEffects = () => {
    //authentication useEffect
    const { socket } = useSingletonHook<
        ReturnType<typeof useGameplayIo>
    >(GAMEPLAY_IO)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseAnimalMedicine, async () => {
            if (!socket) {
                return
            }
            socket.emit(EventName.RequestHelpUseAnimalMedicine)
        })
        
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseAnimalMedicine)
        }
    }, [socket])
}