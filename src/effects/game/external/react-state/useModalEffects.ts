import { useDisclosure } from "react-use-disclosure"
import {
    QUESTS_MODAL_DISCLOSURE,
    NEIGHBORS_MODAL_DISCLOSURE,
    PROFILE_MODAL_DISCLOSURE,
    NFT_STORAGE_MODAL_DISCLOSURE,
    DOWNLOAD_MODAL_DISCLOSURE,
    INFO_MODAL_DISCLOSURE,
    INVENTORY_MODAL_DISCLOSURE,
    ROADSIDE_STAND_MODAL_DISCLOSURE,
    SHOP_MODAL_DISCLOSURE,
    SETTINGS_MODAL_DISCLOSURE,
    UPGRADE_MODAL_DISCLOSURE,
    SELL_MODAL_DISCLOSURE,
    DAILY_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import {
    ModalName,
    OpenModalMessage,
    UpdateSellModalContentMessage,
    UpdateUpgradeModalContentMessage,
} from "@/modules/event-emitter"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import {
    setSellModalContent,
    setUpgradeModalContent,
    useAppDispatch,
} from "@/redux"

export const useModalEffects = () => {
    const { open: openQuestsModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(QUESTS_MODAL_DISCLOSURE)
    const { open: openNeighborsModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NEIGHBORS_MODAL_DISCLOSURE)
    const { open: openProfileModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(PROFILE_MODAL_DISCLOSURE)
    const { open: openNFTStorageModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFT_STORAGE_MODAL_DISCLOSURE)
    const { open: openDownloadModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(DOWNLOAD_MODAL_DISCLOSURE)
    const { open: openInfoModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(INFO_MODAL_DISCLOSURE)
    const { open: openInventoryModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(INVENTORY_MODAL_DISCLOSURE)
    const { open: openRoadsideStandModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(ROADSIDE_STAND_MODAL_DISCLOSURE)
    const { open: openShopModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SHOP_MODAL_DISCLOSURE)
    const { open: openSettingsModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SETTINGS_MODAL_DISCLOSURE)
    const { open: openSellModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELL_MODAL_DISCLOSURE)
    const { open: openUpgradeModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(UPGRADE_MODAL_DISCLOSURE)
    const dispatch = useAppDispatch()
    const { open: openDailyModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(DAILY_MODAL_DISCLOSURE)

    useEffect(() => {
    // update sell modal content
        ExternalEventEmitter.on(
            ExternalEventName.UpdateSellModalContent,
            ({ placedItemId }: UpdateSellModalContentMessage) => {
                dispatch(setSellModalContent({ placedItemId }))
            }
        )

        ExternalEventEmitter.on(
            ExternalEventName.UpdateUpgradeModalContent,
            ({ placedItemId }: UpdateUpgradeModalContentMessage) => {
                dispatch(
                    setUpgradeModalContent({ placedItemId })
                )
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
                    openNFTStorageModal()
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
                case ModalName.Daily:
                    openDailyModal()
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
