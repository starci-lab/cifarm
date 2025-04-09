import { useAppDispatch } from "@/redux"
import React from "react"
import { DialogHeader, DialogTitle, GridTable, List, ModalHeader, ScrollArea, ScrollBar, Separator, Spacer } from "@/components"
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
import { cn } from "@/lib/utils"
import { InventoryCard } from "./InventoryCard"
import { v4 } from "uuid"
import { InventoryKind } from "@/modules/entities"
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

    return (
        <Dialog open={true} onOpenChange={toggle}>
            <DialogContent>
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
            </DialogContent>
        </Dialog>
    )
}
