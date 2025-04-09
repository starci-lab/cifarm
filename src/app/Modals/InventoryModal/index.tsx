import { useAppDispatch } from "@/redux"
import React from "react"
import {
    GridTable,
    ModalHeader,
    Separator,
    Spacer,
} from "@/components"
import { GRAPHQL_QUERY_INVENTORIES_SWR, GRAPHQL_QUERY_STATIC_SWR, INVENTORY_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { useGraphQLQueryStaticSwr, useGraphQLQueryInventoriesSwr } from "@/hooks"
import { InventoryCard } from "./InventoryCard"

export const InventoryModal = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INVENTORY_DISCLOSURE)
    const dispatch = useAppDispatch()

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const { swr: inventoriesSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryInventoriesSwr>>(
        GRAPHQL_QUERY_INVENTORIES_SWR
    )

    return (
        <Dialog open={true} onOpenChange={toggle} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader
                            title="Inventory"
                        />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <GridTable items={inventoriesSwr.data?.data.inventories ?? []} contentCallback={(inventory) => (
                        <InventoryCard inventory={inventory} />
                    )} />
                    <Spacer y={4}/>
                    <Separator />
                    <Spacer y={4}/>
                    <GridTable enableScroll={false} items={inventoriesSwr.data?.data.inventories ?? []} contentCallback={(inventory) => (
                        <InventoryCard inventory={inventory} />
                    )} />
                </div>    
            </DialogContent>
        </Dialog>
    )
}
