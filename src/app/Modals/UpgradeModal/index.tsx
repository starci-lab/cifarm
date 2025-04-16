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
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_QUERY_STATIC_SWR, UPGRADE_DISCLOSURE } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/game"
import { useAppSelector } from "@/redux"
import { UpgradeBuildingMessage, useGraphQLQueryStaticSwr } from "@/hooks"
import { getUpgradePrice } from "@/modules/entities"
import { AssetIconId, assetIconMap } from "@/modules/assets"

export const UpgradeModal: FC = () => {
    const { toggle, isOpen, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(UPGRADE_DISCLOSURE)
    const { placedItemBuildingId } = useAppSelector(
        (state) => state.modalReducer.upgradeModal
    )
    const placedItems = useAppSelector(
        (state) => state.sessionReducer.placedItems
    )
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

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
                <div>
                    {(() => {
                        if (!placedItemBuildingId) return
                        const placedItem = placedItems.find(
                            (item) => item.id === placedItemBuildingId
                        )
                        if (!placedItem) throw new Error("Placed item not found")
                        if (!staticSwr.data?.data) throw new Error("Static data not found")
                        const { upgradeable, upgradePrice } = getUpgradePrice({
                            placedItem,
                            staticData: staticSwr.data.data,
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
                                            <ScaledImage
                                                key={index}
                                                src={assetIconMap[AssetIconId.PurpleStar].base.assetUrl}
                                            />
                                        ))}
                                        {(placedItem.buildingInfo?.currentUpgrade ?? 0) < 3 && (
                                            <ScaledImage
                                                src={assetIconMap[AssetIconId.UpgradeStar].base.assetUrl}
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        )
                    })()}
                </div>
                <DialogFooter>
                    <ExtendedButton
                        variant="ghost"
                        className="w-full"
                        onClick={() => close()}
                    >
            Cancel
                    </ExtendedButton>
                    <ExtendedButton
                        className="w-full"
                        onClick={() => {
                            close()
                            if (!placedItemBuildingId)
                                throw new Error("Placed item id not found")
                            const eventMessage: UpgradeBuildingMessage = {
                                placedItemBuildingId: placedItemBuildingId,
                            }
                            ExternalEventEmitter.emit(
                                ExternalEventName.RequestUpgradeBuilding,
                                eventMessage
                            )
                        }}
                    >
            Confirm
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
