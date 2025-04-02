import { WS } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
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
