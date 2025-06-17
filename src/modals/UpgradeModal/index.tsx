import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ExtendedButton,
    Image,
    ScaledImage,
    Spacer,
    DialogBody,
} from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { UPGRADE_MODAL_DISCLOSURE } from "@/singleton"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/modules/event-emitter"
import { setUpgradeModalContent, useAppDispatch, useAppSelector } from "@/redux"
import { UpgradeBuildingMessage } from "@/singleton"
import { getUpgradePrice } from "@/utils"
import { AssetIconId, assetIconMap } from "@/modules/assets"

export const UpgradeModal: FC = () => {
    const { toggle, isOpen, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(UPGRADE_MODAL_DISCLOSURE)
    const placedItemBuildingId = useAppSelector((state) => state.modalReducer.upgradeModal.placedItemId)
    const placedItems = useAppSelector((state) => state.apiReducer.coreApi.placedItems)
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const dispatch = useAppDispatch()

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                toggle(value)
                if (!value) {
                    ExternalEventEmitter.emit(ExternalEventName.CloseModal, {
                        modalName: ModalName.Upgrade,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upgrade</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {(() => {
                        if (!placedItemBuildingId) return
                        const placedItem = placedItems.find(
                            (item) => item.id === placedItemBuildingId
                        )
                        if (!placedItem) throw new Error("Placed item not found")
                        if (!staticData) throw new Error("Static data not found")
                        const { upgradeable, upgradePrice } = getUpgradePrice({
                            placedItem,
                            staticData,
                        })
                        if (!upgradeable) {
                            throw new Error("Item is not upgradeable")
                        }
                        return (
                            <>
                                <div className="flex items-center gap-1 text-sm">
                                    <div>Do you want to update this building for</div>
                                    <div className="flex items-center gap-1">
                                        <Image
                                            src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                            className="w-5 h-5"
                                        />
                                        {upgradePrice}
                                    </div>
                                    <div>?</div>
                                </div>
                                <Spacer y={4} />
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center gap-2 text-sm">
                                        {Array.from({
                                            length: placedItem.buildingInfo?.currentUpgrade ?? 0,
                                        }).map((_, index) => (
                                            <div key={index} className="w-12 h-12 relative">
                                                <ScaledImage
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"          
                                                    src={assetIconMap[AssetIconId.PurpleStar].base.assetUrl}
                                                />
                                            </div>
                                        ))}
                                        {(placedItem.buildingInfo?.currentUpgrade ?? 0) < 3 && (
                                            <div className="w-12 h-12 relative">
                                                <ScaledImage
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                    src={assetIconMap[AssetIconId.UpgradeStar].base.assetUrl}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )
                    })()}
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        className="w-full"
                        onClick={() => {
                            if (!placedItemBuildingId)
                                throw new Error("Placed item id not found")
                            const eventMessage: UpgradeBuildingMessage = {
                                placedItemBuildingId: placedItemBuildingId,
                            }
                            ExternalEventEmitter.emit(
                                ExternalEventName.RequestUpgradeBuilding,
                                eventMessage
                            )
                            dispatch(setUpgradeModalContent({}))
                            close()
                        }}
                    >
            Confirm
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
