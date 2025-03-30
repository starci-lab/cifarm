import { useDisclosure } from "react-use-disclosure"
import {
    QUESTS_DISCLOSURE,
    NEIGHBORS_DISCLOSURE,
    PROFILE_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    ModalName,
    OpenModalMessage,
} from "../../../events"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/game/events"

export const useModalEffects = () => {
    const { toggle: questsToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(QUESTS_DISCLOSURE)
    const { toggle: neighborsToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)
    const { toggle: profileToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(PROFILE_DISCLOSURE)

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.OpenExternalModal,
            ({ modalName }: OpenModalMessage) => {
                switch (modalName) {
                case ModalName.Quests:
                    questsToggle(true)
                    break
                case ModalName.Neighbors:
                    neighborsToggle(true)
                    break
                case ModalName.Profile:
                    profileToggle(true)
                    break
                default:
                    break
                }
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.OpenExternalModal)
        }
    }, [])
}
