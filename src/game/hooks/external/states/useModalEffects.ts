import { useDisclosure } from "react-use-disclosure"
import {
    QUESTS_DISCLOSURE,
    NEIGHBORS_DISCLOSURE,
    PROFILE_DISCLOSURE,
    NFT_STORAGE_DISCLOSURE,
    DOWNLOAD_DISCLOSURE,
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
    const { toggle: nftStorageToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NFT_STORAGE_DISCLOSURE)
    const { toggle: downloadToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(DOWNLOAD_DISCLOSURE)


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
                case ModalName.NFTStorage:
                    nftStorageToggle(true)
                    break
                case ModalName.Download:
                    downloadToggle(true)
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
