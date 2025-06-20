import React, { FC, ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ExtendedButton,
    Image,
    DialogBody,
    List,
    Title,
} from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { UPGRADE_MODAL_DISCLOSURE } from "@/singleton"
import {
    ExternalEventEmitter,
    ExternalEventName,
    ModalName,
} from "@/modules/event-emitter"
import {
    setUpgradeModalContent,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { UpgradeBuildingMessage } from "@/singleton"
import { getUpgradePrice } from "@/utils"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { ArrowRight } from "@phosphor-icons/react"
import { BuildingKind, PlacedItemType } from "@/types"

export enum UpgradeListItem {
  UpgradePrice = "upgradePrice",
  Stars = "stars",
  Capacity = "capacity",
  HoneyMultiplier = "honeyMultiplier",
}

export const UpgradeModal: FC = () => {
    const { toggle, isOpen, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(UPGRADE_MODAL_DISCLOSURE)
    const placedItemBuildingId = useAppSelector(
        (state) => state.modalReducer.upgradeModal.placedItemId
    )
    const placedItems = useAppSelector(
        (state) => state.apiReducer.coreApi.placedItems
    )
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const dispatch = useAppDispatch()

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
    const placedItemType = staticData.placedItemTypes.find(
        (placedItemType) => placedItemType.building === placedItem.placedItemType
    )
    if (!placedItemType) throw new Error("Placed item type not found")
    const building = staticData.buildings.find(
        (building) =>
            placedItemType.type === PlacedItemType.Building &&
      building.id === placedItemType.building
    )
    if (!building) throw new Error("Building not found")
    const renderItems = (): Partial<Record<UpgradeListItem, ReactNode>> => {
        const items: Partial<Record<UpgradeListItem, ReactNode>> = {}
        // add the upgrade price
        items[UpgradeListItem.UpgradePrice] = (
            <div className="bg-content-2 px-3 py-2 p flex justify-between items-center">
                <Title
                    classNames={{
                        title: "text-muted-foreground",
                        tooltip: "text-muted-foreground",
                    }}
                    title="Upgrade Price"
                    tooltipString="The price of the upgrade"
                />
                <div className="flex items-center gap-2">
                    <div className="text-base">
                        {upgradePrice}
                    </div>
                </div>
            </div>
        )
        // add the stars
        items[UpgradeListItem.Stars] = (
            <div className="bg-content-2 px-3 py-2 p flex justify-between items-center">
                <Title
                    classNames={{
                        title: "text-muted-foreground",
                        tooltip: "text-muted-foreground",
                    }}
                    title="Stars"
                    tooltipString="The number of stars that the building has"
                />
                <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-2 text-sm">
                        {Array.from({
                            length: placedItem.buildingInfo?.currentUpgrade ?? 0,
                        }).map((_, index) => (
                            <Image
                                key={index}
                                className="w-6 h-160"
                                src={assetIconMap[AssetIconId.PurpleStar].base.assetUrl}
                            />
                        ))}
                    </div>
                    <ArrowRight />
                    <div className="flex items-center gap-2 text-sm">
                        {Array.from({
                            length: placedItem.buildingInfo?.currentUpgrade ?? 0,
                        }).map((_, index) => (
                            <Image
                                key={index}
                                className="w-6 h-160"
                                src={assetIconMap[AssetIconId.PurpleStar].base.assetUrl}
                            />
                        ))}
                        {(placedItem.buildingInfo?.currentUpgrade ?? 0) < 3 && (
                            <Image
                                className="w-6 h-6"
                                src={assetIconMap[AssetIconId.UpgradeStar].base.assetUrl}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
        // add the capacity if the upgrading buiding is a house
        if (building.kind === BuildingKind.AnimalHouse) {
            items[UpgradeListItem.Capacity] = (
                <div className="bg-content-2 px-3 py-2 p flex justify-between items-center">
                    <Title
                        classNames={{
                            title: "text-muted-foreground",
                            tooltip: "text-muted-foreground",
                        }}
                        title="Capacity"
                        tooltipString="The number of animals that can be housed in the building"
                    />
                    <div className="flex items-center gap-2">
                        <div className="text-base">
                            {
                                building?.upgrades?.find(
                                    (upgrade) =>
                                        upgrade.upgradeLevel ===
                    (placedItem.buildingInfo?.currentUpgrade ?? 0)
                                )?.capacity
                            }
                        </div>
                        <ArrowRight />
                        <div className="text-base">
                            {
                                building?.upgrades?.find(
                                    (upgrade) =>
                                        upgrade.upgradeLevel ===
                    (placedItem.buildingInfo?.currentUpgrade ?? 0) + 1
                                )?.capacity
                            }
                        </div>
                    </div>
                </div>
            )
        }

        // build the capacity for the pet house
        if (building.kind === BuildingKind.BeeHouse) {
            items[UpgradeListItem.HoneyMultiplier] = (
                <div className="bg-content-2 px-3 py-2 p flex justify-between items-center">
                    <Title
                        classNames={{
                            title: "text-muted-foreground",
                            tooltip: "text-muted-foreground",
                        }}
                        title="Honey Multiplier"
                        tooltipString="The amount of honey produced multiplied by the multiplier"
                    />
                    <div className="flex items-center gap-2">
                        <div className="text-base">
                            {
                                building?.upgrades?.find(
                                    (upgrade) =>
                                        upgrade.upgradeLevel ===
                                        (placedItem.buildingInfo?.currentUpgrade ?? 0)
                                )?.honeyMultiplier
                            }
                        </div>
                        <ArrowRight />
                        <div className="text-base">
                            {
                                building?.upgrades?.find(
                                    (upgrade) =>
                                        upgrade.upgradeLevel ===
                                        (placedItem.buildingInfo?.currentUpgrade ?? 0) + 1
                                )?.honeyMultiplier
                            }
                        </div>
                    </div>
                </div>
            )
        }
        return items
    }

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
                        return (
                     
                            <List
                                enableScroll={false}
                                items={[
                                    ...Object.entries(renderItems()).map(([key, value]) => ({
                                        title: key,
                                        content: value,
                                    })),
                                ]}
                                contentCallback={(item) => item.content}
                            />      
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
