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
    SETTINGS_DISCLOSURE,
    UPGRADE_DISCLOSURE,
    SELL_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    ModalName,
    OpenModalMessage,
    UpdateSellModalContentMessage,
} from "../../../events"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/game/events"
import { setSellModal, useAppDispatch } from "@/redux"

export const useModalEffects = () => {
    const { open: openQuestsModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(QUESTS_DISCLOSURE)
    const { open: openNeighborsModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)
    const { open: openProfileModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(PROFILE_DISCLOSURE)
    const { open: openNftStorageModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFT_STORAGE_DISCLOSURE)
    const { open: openDownloadModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(DOWNLOAD_DISCLOSURE)
    const { open: openInfoModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INFO_DISCLOSURE)
    const { open: openInventoryModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INVENTORY_DISCLOSURE)
    const { open: openRoadsideStandModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(ROADSIDE_STAND_DISCLOSURE)
    const { open: openShopModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SHOP_DISCLOSURE)
    const { open: openSettingsModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SETTINGS_DISCLOSURE)
    const { open: openSellModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SELL_DISCLOSURE)
    const { open: openUpgradeModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(UPGRADE_DISCLOSURE)
    const dispatch = useAppDispatch()

    useEffect(() => {
    // update sell modal content
        ExternalEventEmitter.on(
            ExternalEventName.UpdateSellModalContent,
            ({ placedItemId }: UpdateSellModalContentMessage) => {
                dispatch(setSellModal({ placedItemId }))
            }
        )

        // open modal
        ExternalEventEmitter.on(
            ExternalEventName.OpenModal,
            ({ modalName }: OpenModalMessage) => {
                switch (modalName) {
                case ModalName.Quests:
                    openQuestsModal()
                    break
                case ModalName.Neighbors:
                    openNeighborsModal()
                    break
                case ModalName.Profile:
                    openProfileModal()
                    break
                case ModalName.NFTStorage:
                    openNftStorageModal()
                    break
                case ModalName.Download:
                    openDownloadModal()
                    break
                case ModalName.Info:
                    openInfoModal()
                    break
                case ModalName.Inventory:
                    openInventoryModal()
                    break
                case ModalName.RoadsideStand:
                    openRoadsideStandModal()
                    break
                case ModalName.Shop:
                    openShopModal()
                    break
                case ModalName.Settings:
                    openSettingsModal()
                    break
                case ModalName.Sell:
                    openSellModal()
                    break
                case ModalName.Upgrade:
                    openUpgradeModal()
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
