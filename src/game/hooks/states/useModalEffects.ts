import { useDisclosure } from "@/hooks"
import {
    QUESTS_DISCLOSURE,
    NEIGHBORS_DISCLOSURE,
    PROFILE_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    EventBus,
    EventName,
    ModalName,
    OpenModalMessage,
} from "@/game/event-bus"
import { useEffect } from "react"

export const useModalEffects = () => {
    const { onOpenChange: onQuestsOpenChange } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(QUESTS_DISCLOSURE)
    const { onOpenChange: onNeighborsOpenChange } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)
    const { onOpenChange: onProfileOpenChange } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(PROFILE_DISCLOSURE)

    useEffect(() => {
        EventBus.on(
            EventName.OpenExternalModal,
            ({ modalName }: OpenModalMessage) => {
                switch (modalName) {
                case ModalName.Quests:
                    onQuestsOpenChange(true)
                    break
                case ModalName.Neighbors:
                    onNeighborsOpenChange(true)
                    break
                case ModalName.Profile:
                    onProfileOpenChange(true)
                    break
                default:
                    break
                }
            }
        )

        return () => {
            EventBus.off(EventName.OpenExternalModal)
        }
    }, [])
}
