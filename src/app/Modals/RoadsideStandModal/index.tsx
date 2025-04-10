"use client"
import { GRAPHQL_QUERY_STATIC_SWR, ROADSIDE_STAND_DISCLOSURE, SELECT_INVENTORY_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useState, useEffect } from "react"
import { ModalName, ExternalEventEmitter, ExternalEventName } from "@/game"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { useAppSelector } from "@/redux"
import { ExtendedButton } from "@/components"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/modules/entities"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { GridTable } from "@/components"
import { formatTime, getNextMinuteCronExecution } from "@/modules/common"
export const RoadsideStandModal: FC = () => {
    const { toggle, isOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(ROADSIDE_STAND_DISCLOSURE)

    const {  open: openSelectInventory } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SELECT_INVENTORY_DISCLOSURE)
    const [nextDeliveryTime, setNextDeliveryTime] = useState(getNextMinuteCronExecution())
    useEffect(() => {
        const interval = setInterval(() => {
            setNextDeliveryTime(getNextMinuteCronExecution())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const inventories = useAppSelector((state) => state.sessionReducer.inventories)
    const deliveryInventories = Array.from(
        { length: staticSwr.data?.data.defaultInfo.deliveryCapacity ?? 0 },
        (_, index) => {
            const inventory = inventories.find(
                (inventory) => inventory.kind === InventoryKind.Delivery && inventory.index === index
            ) ?? null
            return {
                index,
                inventory: inventory,
            }
        }
    )   
    return (
        <Dialog 
            open={isOpen} 
            onOpenChange={(open) => {
                toggle(open)
                if (!open) {
                    ExternalEventEmitter.emit(ExternalEventName.CloseExternalModal, {
                        modalName: ModalName.Quests,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>   
                        Roadside Stand
                    </DialogTitle>
                </DialogHeader>
                <GridTable
                    items={deliveryInventories}
                    contentCallback={({ inventory }) => (
                        <InventoryCard inventory={inventory} />
                    )}
                    keyCallback={(item) => `${item.index}-${item.inventory?.id}`}
                />
                <div className="text-sm">
                    Next delivery: {formatTime(nextDeliveryTime)}
                </div>
                <DialogFooter>
                    <ExtendedButton className="w-full" onClick={() => {
                        openSelectInventory()
                    }}>Deliver</ExtendedButton>
                </DialogFooter>
            </DialogContent>   
        </Dialog>
    )
}