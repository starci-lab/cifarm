import { GAMEPLAY_IO } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"
import { EmitterEventName, useGameplayIo, UseAnimalMedicineMessage } from "@/hooks"

export const useUseAnimalMedicineEffects = () => {
    //authentication useEffect
    const { socket } =
               useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)  
    useEffect(() => {
        EventBus.on(
            EventName.RequestUseAnimalMedicine,
            async (message: UseAnimalMedicineMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseAnimalMedicine, message)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestUseAnimalMedicine)
        }
    }, [socket])
}
