import { INVITE_USER_DISCLOSURE } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@heroui/react"
import { useEffect } from "react"

export const useReferralLinkEffects = () => {
    const { onOpen } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(INVITE_USER_DISCLOSURE)
    // load user data
    useEffect(() => {
        EventBus.on(EventName.OpenReferralLinkModal, async () => {
            //load user data
            onOpen()
        })
    
        return () => {
            EventBus.removeListener(EventName.OpenReferralLinkModal)
        }
    }, [onOpen])
}