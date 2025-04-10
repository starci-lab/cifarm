import { useAppSelector } from "@/redux"
import React from "react"
import {
    DialogHeader,
    DialogTitle,
    GridTable,
    Separator,
    Spacer,
} from "@/components"
import {
    GRAPHQL_QUERY_STATIC_SWR,
    INVENTORY_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Dialog, DialogContent } from "@/components"
import { useDisclosure } from "react-use-disclosure"
import {
    useGraphQLQueryStaticSwr,
} from "@/hooks"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/modules/entities"

export const InventoryModal = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INVENTORY_DISCLOSURE)

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const inventories = useAppSelector(state => state.sessionReducer.inventories)

    const storageInventories = Array.from(
        { length: staticSwr.data?.data.defaultInfo.storageCapacity ?? 0 },
        (_, index) => {
            const inventory = inventories.find(
                (inventory) =>
                    inventory.kind === InventoryKind.Storage && inventory.index === index
            ) ?? null
            return {
                index,
                kind: InventoryKind.Storage,
                inventory,
            }
        }
    )

    const toolInventories = Array.from(
        { length: staticSwr.data?.data.defaultInfo.toolCapacity ?? 0 },
        (_, index) => {
            const inventory = inventories.find(
                (inventory) => inventory.kind === InventoryKind.Tool && inventory.index === index
            ) ?? null
            return {
                index,
                kind: InventoryKind.Tool,
                inventory: inventory,
            }
        }
    )   
    
    return (
        <Dialog open={true} onOpenChange={toggle}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Inventory</DialogTitle>
                </DialogHeader>
                <div>
                    <GridTable
                        items={storageInventories}
                        contentCallback={({ inventory, index, kind }) => (
                            <InventoryCard inventory={inventory} index={index} kind={kind} />
                        )}
                        keyCallback={(item) => `${item.kind}-${item.index}`}
                    />
                    <Spacer y={4} />
                    <Separator />
                    <Spacer y={4} />
                    <GridTable
                        enableScroll={false}
                        items={toolInventories}
                        contentCallback={({ inventory, index, kind }) => (
                            <InventoryCard inventory={inventory} index={index} kind={kind} />
                        )}
                        keyCallback={(item) => `${item.kind}-${item.index}`}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
