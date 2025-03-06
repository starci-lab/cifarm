import { PROFILE_DISCLOSURE } from "@/app/constants"
import { EventBus, EventName, ModalName, OpenExternalModalMessage } from "@/game/event-bus"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@heroui/react"
import { useEffect } from "react"

export const useProfileEffects = () => {
    const { onOpen } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(PROFILE_DISCLOSURE)
    // load user data
    useEffect(() => {
        EventBus.on(EventName.OpenExternalModal, async ({ modalName }: OpenExternalModalMessage) => {
            if (modalName !== ModalName.Profile) {
                return 
            }
            onOpen()
        })
    
        return () => {
            EventBus.removeListener(EventName.OpenExternalModal)
        }
    }, [onOpen])
}