import { QUESTS_DISCLOSURE } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "@heroui/react"
import { useEffect } from "react"

export const useQuestsEffects = () => {
    const { onOpen } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(QUESTS_DISCLOSURE)
    // load user data
    useEffect(() => {
        EventBus.on(EventName.OpenQuestsModal, async () => {
            //load user data
            onOpen()
        })
    
        return () => {
            EventBus.removeListener(EventName.OpenQuestsModal)
        }
    }, [onOpen])
}