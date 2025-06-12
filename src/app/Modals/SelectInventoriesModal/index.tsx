"use client"
import {
    GRAPHQL_QUERY_STATIC_SWR,
    SELECT_INVENTORY_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector, setSelectedDeliveryInventoryIds, useAppDispatch } from "@/redux"
import React, { FC } from "react"
import { ExtendedButton, GridTable, Spacer } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { InventoryType, InventoryKind } from "@/modules/entities"
import { InventoryCard } from "./InventoryCard"
import { DeliverInventoriesMessage, useGraphQLQueryStaticSwr } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import pluralize from "pluralize"
import { cn } from "@/lib/utils"

export const SelectInventoriesModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SELECT_INVENTORY_DISCLOSURE
    )
    const inventories = useAppSelector(
        (state) => state.sessionReducer.inventories
    )

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const productInventories = inventories.filter((inventory) => {
        const inventoryType = staticSwr.data?.data.inventoryTypes.find(
            (inventoryType) => inventoryType.id === inventory.inventoryType
        )
        if (!inventoryType) return false
        return inventoryType.type === InventoryType.Product && inventory.kind === InventoryKind.Storage
    })

    const selectedDeliveryInventoryIds = useAppSelector(
        (state) => state.sessionReducer.selectedDeliveryInventoryIds
    )
    const dispatch = useAppDispatch()

    const slotsDeliveryInventoryLeft = useAppSelector(
        (state) => state.sessionReducer.slotsDeliveryInventoryLeft
    )

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select Inventories</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <GridTable
                        useContainer={true}
                        useGridWrap
                        classNames={{
                            scrollAreaWrapper: "max-h-[200px] h-[200px]",
                            scrollArea: "max-h-[calc(200px+32px)] h-[calc(200px+32px)]",
                            container: "p-2 rounded-lg bg-content-2",
                        }}
                        items={productInventories}
                        contentCallback={(inventory) => (
                            <InventoryCard inventory={inventory} />
                        )}
                        keyCallback={(item) => item.id}
                    />
                    <div>
                        <Spacer y={2} />
                        <div className={cn("text-sm text-muted-foreground", {
                            "text-destructive": slotsDeliveryInventoryLeft === 0,
                            "text-muted-foreground": slotsDeliveryInventoryLeft > 0,
                        })}>
                            {slotsDeliveryInventoryLeft} {pluralize("slot", slotsDeliveryInventoryLeft > 0 ? slotsDeliveryInventoryLeft: 1)} left
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        className="w-full"
                        disabled={!selectedDeliveryInventoryIds.length}
                        onClick={() => {
                            if (!selectedDeliveryInventoryIds.length) throw new Error("No inventory selected")
                            const deliverInventoriesMessage: DeliverInventoriesMessage = {
                                inventoryIds: selectedDeliveryInventoryIds,
                            }
                            ExternalEventEmitter.emit(ExternalEventName.RequestDeliverInventories, deliverInventoriesMessage)
                            dispatch(setSelectedDeliveryInventoryIds([]))
                            close()
                        }}
                    >
                        Deliver
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
