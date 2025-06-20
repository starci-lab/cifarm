"use client"
import {
    RetrieveInventoriesMessage,
    ROADSIDE_STAND_MODAL_DISCLOSURE,
    SELECT_INVENTORY_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import React, { FC, useState, useEffect } from "react"
import {
    ModalName,
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    Image,
    Title,
    Spacer,
    DialogBody,
    List,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import {
    setSelectedRetrieveInventoryIds,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { ExtendedButton } from "@/components"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/types"
import { GridTable } from "@/components"
import { formatTime, getNextMinuteCronExecution } from "@/modules/common"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { cn } from "@/utils"
import pluralize from "pluralize"

export const RoadsideStandModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        ROADSIDE_STAND_MODAL_DISCLOSURE
    )
    const { open: openSelectInventory } = useSingletonHook<
        ReturnType<typeof useDisclosure>
    >(SELECT_INVENTORY_MODAL_DISCLOSURE)

    const [nextDeliveryTime, setNextDeliveryTime] = useState(
        getNextMinuteCronExecution()
    )
    useEffect(() => {
        const interval = setInterval(() => {
            setNextDeliveryTime(getNextMinuteCronExecution())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const inventories = useAppSelector(
        (state) => state.apiReducer.coreApi.inventories
    )
    const deliveryInventories = Array.from(
        { length: staticData?.defaultInfo.deliveryCapacity ?? 0 },
        (_, index) => {
            const inventory =
                inventories.find(
                    (inventory) =>
                        inventory.kind === InventoryKind.Delivery &&
                        inventory.index === index
                ) ?? null
            return {
                index,
                inventory: inventory,
            }
        }
    )
    const dispatch = useAppDispatch()
    const selectedRetrieveInventoryIds = useAppSelector(
        (state) => state.selectionReducer.selectedRetrieveInventoryIds
    )

    // compute delivery payout
    const computeDeliveryPayout = () => {
        const totalGold = deliveryInventories.reduce((acc, inventory) => {
            const inventoryType = staticData?.inventoryTypes.find(
                (inventoryType) => inventoryType.id === inventory.inventory?.inventoryType
            )
            if (!inventoryType) return acc
            const product = staticData?.products.find(
                (product) => product.id === inventoryType.product
            )
            if (!product) return acc
            return acc + (product.goldAmount ?? 0) * (inventory.inventory?.quantity ?? 0)
        }, 0)
        return totalGold
    }

    const slotsStorageInventoryLeft = useAppSelector(
        (state) => state.selectionReducer.slotsStorageInventoryLeft
    )

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                toggle(open)
                if (!open) {
                    ExternalEventEmitter.emit(ExternalEventName.CloseModal, {
                        modalName: ModalName.RoadsideStand,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Roadside Stand</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <GridTable
                        useContainer={true}
                        enableScroll={false}
                        useGridWrap={true}
                        classNames={{
                            scrollAreaWrapper: "max-h-[250px] h-[250px]",
                            scrollArea: "max-h-[calc(250px+32px)] h-[calc(250px+32px)]",
                        }}
                        items={deliveryInventories}
                        contentCallback={({ inventory }) => (
                            <InventoryCard inventory={inventory} />
                        )}
                        keyCallback={(item) => `${item.index}-${item.inventory?.id}`}
                    />
                    {
                        selectedRetrieveInventoryIds.length > 0 && (
                            <>
                                <Spacer y={2} />
                                <div className={cn("text-sm text-muted-foreground", {
                                    "text-destructive": slotsStorageInventoryLeft === 0,
                                    "text-muted-foreground": slotsStorageInventoryLeft > 0,
                                    "hidden": !selectedRetrieveInventoryIds.length,
                                })}>
                                    {slotsStorageInventoryLeft} {pluralize("slot", slotsStorageInventoryLeft > 0 ? slotsStorageInventoryLeft : 1)} left
                                </div>
                            </>
                        )
                    }
                    <Spacer y={4} />
                    <List
                        enableScroll={false}
                        items={[
                            {
                                title: "Delivery payout",
                                tooltipString: "The amount of gold you will receive for delivering the items",
                                content: <div className="flex gap-1 items-center">
                                    <Image
                                        src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                        className="w-6 h-6"
                                    />
                                    {computeDeliveryPayout()}
                                </div>,
                            },
                            {
                                title: "Next delivery",
                                tooltipString: "The time when the next delivery will be available",
                                content: formatTime(nextDeliveryTime),
                            },
                        ]}
                        contentCallback={(item) => (
                            <div className="flex gap-2 items-center justify-between px-3 py-2 bg-content-2">
                                <Title title={item.title} classNames={{
                                    title: "text-base text-muted-foreground",
                                    tooltip: "text-base text-muted-foreground",
                                }} tooltipString={item.tooltipString} />
                                {item.content}
                            </div>
                        )}
                    />
                </DialogBody>
                <DialogFooter>
                    {selectedRetrieveInventoryIds.length > 0 ? (
                        <div className="flex gap-2 w-full">
                            <ExtendedButton
                                disabled={slotsStorageInventoryLeft === 0}
                                className="flex-1"
                                variant="flat"
                                color="secondary"
                                onClick={() => {
                                    dispatch(setSelectedRetrieveInventoryIds([]))
                                }}
                            >
                                Cancel
                            </ExtendedButton>
                            <ExtendedButton
                                className="flex-1"
                                variant="solid"
                                color="destructive"
                                onClick={() => {
                                    const eventMessage: RetrieveInventoriesMessage = {
                                        inventoryIds: selectedRetrieveInventoryIds,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestRetrieveInventories,
                                        eventMessage
                                    )
                                    dispatch(setSelectedRetrieveInventoryIds([]))
                                }}
                            >
                                Retrieve
                            </ExtendedButton>
                        </div>
                    ) : (
                        <ExtendedButton
                            className="w-full"
                            onClick={() => {
                                openSelectInventory()
                            }}
                        >
                            Select Inventories
                        </ExtendedButton>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
