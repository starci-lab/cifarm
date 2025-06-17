import { WS } from "@/singleton"
import { useSingletonHook } from "@/singleton"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { EmitterEventName, useWs, UseAnimalMedicineMessage } from "@/hooks"

export const useUseAnimalMedicineEffects = () => {
    //authentication useEffect
    const { socket } =
               useSingletonHook<ReturnType<typeof useWs>>(WS)  
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestUseAnimalMedicine,
            async (message: UseAnimalMedicineMessage) => {
                if (!socket) {
                    return
                }
                socket.emit(EmitterEventName.UseAnimalMedicine, message)
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestUseAnimalMedicine
            )
        }
    }, [socket])
}
