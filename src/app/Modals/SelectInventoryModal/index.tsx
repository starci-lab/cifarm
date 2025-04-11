"use client"
import {
    GRAPHQL_QUERY_STATIC_SWR,
    SELECT_INVENTORY_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { ExtendedButton, GridTable } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { InventoryType, InventoryKind } from "@/modules/entities"
import { InventoryCard } from "./InventoryCard"
import { DeliverInventoryMessage, useGraphQLQueryStaticSwr } from "@/hooks"
import { ExternalEventEmitter, ExternalEventName } from "@/game"
import { setSelectedDeliveryInventoryId, useAppDispatch } from "@/redux"

export const SelectInventoryModal: FC = () => {
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
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
        if (!inventoryType) throw new Error("Inventory type not found")
        return inventoryType.type === InventoryType.Product && inventory.kind === InventoryKind.Storage
    })

    const selectedDeliveryInventoryId = useAppSelector(
        (state) => state.sessionReducer.selectedDeliveryInventoryId
    )
    const dispatch = useAppDispatch()

    if (!account) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select Inventory</DialogTitle>
                </DialogHeader>
                <div>
                    <GridTable
                        classNames={{
                            scrollArea: "h-[200px]",
                        }}
                        items={productInventories}
                        contentCallback={(inventory) => (
                            <InventoryCard inventory={inventory} />
                        )}
                        keyCallback={(item) => item.id}
                    />
                </div>
                <DialogFooter>
                    <ExtendedButton
                        className="w-full"
                        variant="ghost"
                        disabled={!selectedDeliveryInventoryId}
                        onClick={() => {
                            close()
                            dispatch(setSelectedDeliveryInventoryId())
                        }}
                    >
                        Cancel
                    </ExtendedButton>
                    <ExtendedButton
                        className="w-full"
                        disabled={!selectedDeliveryInventoryId}
                        onClick={() => {
                            if (!selectedDeliveryInventoryId) throw new Error("No inventory selected")
                            const deliverInventoryMessage: DeliverInventoryMessage = {
                                inventoryId: selectedDeliveryInventoryId,
                            }
                            ExternalEventEmitter.emit(ExternalEventName.RequestDeliverInventory, deliverInventoryMessage)
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
