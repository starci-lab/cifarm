import { useDisclosure } from "react-use-disclosure"
import {
    QUESTS_DISCLOSURE,
    NEIGHBORS_DISCLOSURE,
    PROFILE_DISCLOSURE,
    NFT_STORAGE_DISCLOSURE,
    DOWNLOAD_DISCLOSURE,
    INFO_DISCLOSURE,
    INVENTORY_DISCLOSURE,
    ROADSIDE_STAND_DISCLOSURE,
    SHOP_DISCLOSURE,
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
    const { toggle: infoToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INFO_DISCLOSURE)
    const { toggle: inventoryToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INVENTORY_DISCLOSURE)
    const { toggle: roadsideStandToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(ROADSIDE_STAND_DISCLOSURE)
    const { toggle: shopToggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SHOP_DISCLOSURE)
    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.OpenModal,
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
                case ModalName.Info:
                    infoToggle(true)
                    break
                case ModalName.Inventory:
                    inventoryToggle(true)
                    break
                case ModalName.RoadsideStand:
                    roadsideStandToggle(true)
                    break
                case ModalName.Shop:
                    shopToggle(true)
                    break
                default:
                    break
                }
            }
        )

        return () => {
            ExternalEventEmitter.removeListener(ExternalEventName.OpenModal)
        }
    }, [])
}
