"use client"
import {
    GRAPHQL_QUERY_STATIC_SWR,
    ROADSIDE_STAND_DISCLOSURE,
    SELECT_INVENTORY_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
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
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import {
    setSelectedRetrieveInventoryIds,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { ExtendedButton } from "@/components"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/modules/entities"
import { RetrieveInventoriesMessage, useGraphQLQueryStaticSwr } from "@/hooks"
import { GridTable } from "@/components"
import { formatTime, getNextMinuteCronExecution } from "@/modules/common"
import { AssetIconId, assetIconMap } from "@/modules/assets"

export const RoadsideStandModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        ROADSIDE_STAND_DISCLOSURE
    )
    const { open: openSelectInventory } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELECT_INVENTORY_DISCLOSURE)

    const [nextDeliveryTime, setNextDeliveryTime] = useState(
        getNextMinuteCronExecution()
    )
    useEffect(() => {
        const interval = setInterval(() => {
            setNextDeliveryTime(getNextMinuteCronExecution())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const inventories = useAppSelector(
        (state) => state.sessionReducer.inventories
    )
    const deliveryInventories = Array.from(
        { length: staticSwr.data?.data.defaultInfo.deliveryCapacity ?? 0 },
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
        (state) => state.sessionReducer.selectedRetrieveInventoryIds
    )

    // compute delivery payout
    const computeDeliveryPayout = () => {
        const totalGold = deliveryInventories.reduce((acc, inventory) => {
            const inventoryType = staticSwr.data?.data.inventoryTypes.find(
                (inventoryType) => inventoryType.id === inventory.inventory?.inventoryType
            )
            if (!inventoryType) return acc
            const product = staticSwr.data?.data.products.find(
                (product) => product.id === inventoryType.product
            )
            if (!product) return acc
            return acc + (product.goldAmount ?? 0) * (inventory.inventory?.quantity ?? 0)
        }, 0)
        return totalGold
    }

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
                <div>
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
                    <Spacer y={4} />
                    <div className="flex gap-2 items-center justify-between">
                        <Title title="Delivery payout" />
                        <div className="flex gap-1 items-center">
                            <Image
                                src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                className="w-6 h-6"
                            />
                            {computeDeliveryPayout()}
                        </div>
                    </div>
                    <Spacer y={2} />
                    <div className="flex gap-2 items-center justify-between">
                        <Title title="Next delivery" />
                        <div className="flex gap-2 items-center">
                            {formatTime(nextDeliveryTime)}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    {selectedRetrieveInventoryIds.length > 0 ? (
                        <div className="flex gap-2 w-full">
                            <ExtendedButton
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
