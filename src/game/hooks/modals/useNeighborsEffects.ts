import { NEIGHBORS_DISCLOSURE } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@heroui/react"
import { useEffect } from "react"

export const useNeighborsEffects = () => {
    const { onOpen } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NEIGHBORS_DISCLOSURE)
    // load user data
    useEffect(() => {
        EventBus.on(EventName.OpenNeighborsModal, async () => {
            //load user data
            onOpen()
        })
    
        return () => {
            EventBus.removeListener(EventName.OpenNeighborsModal)
        }
    }, [onOpen])
}