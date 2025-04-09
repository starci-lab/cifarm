import { useAppDispatch } from "@/redux"
import React from "react"
import { DialogHeader, DialogTitle, GridTable, Separator, Spacer } from "@/components"
import {
    GRAPHQL_QUERY_INVENTORIES_SWR,
    GRAPHQL_QUERY_STATIC_SWR,
    INVENTORY_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Dialog, DialogContent } from "@/components"
import { useDisclosure } from "react-use-disclosure"
import {
    useGraphQLQueryStaticSwr,
    useGraphQLQueryInventoriesSwr,
} from "@/hooks"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/modules/entities"
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
export const InventoryModal = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INVENTORY_DISCLOSURE)
    const dispatch = useAppDispatch()

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const { swr: inventoriesSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwr>
  >(GRAPHQL_QUERY_INVENTORIES_SWR)
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        }),
    )

    return (
        <Dialog open={true} onOpenChange={toggle}>
            <DialogContent >
                <DndContext sensors={sensors} onDragEnd={(event) => {
                    // get the id of the card drag to the inventory
                    console.log(event.over)
                }}>
                    <DialogHeader>
                        <DialogTitle>
                        Inventory
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <GridTable
                            items={inventoriesSwr.data?.data.inventories.filter((inventory) => inventory.kind === InventoryKind.Storage) ?? []}
                            contentCallback={(inventory) => (
                                <InventoryCard inventory={inventory} />
                            )}
                        />
                        <Spacer y={4} />
                        <Separator />
                        <Spacer y={4} />
                        <GridTable
                            enableScroll={false}
                            items={inventoriesSwr.data?.data.inventories.filter((inventory) => inventory.kind === InventoryKind.Tool) ?? []}
                            contentCallback={(inventory) => (
                                <InventoryCard inventory={inventory} />
                            )}
                        />
                    </div>
                </DndContext>
            </DialogContent>
        </Dialog>
    )
}
