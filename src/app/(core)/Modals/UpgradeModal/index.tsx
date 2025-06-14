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
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_QUERY_STATIC_SWR, UPGRADE_DISCLOSURE } from "@/app/(core)/constants"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/modules/event-emitter"
import { setUpgradeModal, useAppDispatch, useAppSelector } from "@/redux"
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
                            dispatch(setUpgradeModal({}))
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
