import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    GridTable,
    Spacer,
    Separator,
    ExtendedButton,
    DialogFooter,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { QUERY_STATIC_SWR_MUTATION, SHIP_DISCLOSURE } from "@/app/constants"
import {
    useGraphQLQueryInventoriesSwr,
    useGraphQLQueryStaticSwr,
} from "@/hooks"
import { QUERY_INVENTORIES_SWR_MUTATION } from "@/app/constants"
import { InventoryCard } from "./InventoryCard"
import { setSelectedShipInventoryId, useAppDispatch } from "@/redux"
import { InventoryKind } from "@/modules/entities"

export const ShipModal: FC = () => {
    const { toggle, isOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SHIP_DISCLOSURE)
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const { swr: inventoriesSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwr>
  >(QUERY_INVENTORIES_SWR_MUTATION)

    const storageInventories = Array.from(
        { length: staticSwr.data?.data.defaultInfo.storageCapacity ?? 0 },
        (_, index) => {
            const inventory =
        inventoriesSwr.data?.data.inventories.find(
            (inventory) =>
                inventory.kind === InventoryKind.Storage &&
            inventory.index === index
        ) ?? null
            return {
                index,
                kind: InventoryKind.Storage,
                inventory,
            }
        }
    )

    const wholesaleMarketInventories = Array.from(
        { length: staticSwr.data?.data.defaultInfo.wholesaleMarketCapacity ?? 0 },
        (_, index) => {
            const inventory =
        inventoriesSwr.data?.data.inventories.find(
            (inventory) =>
                inventory.kind === InventoryKind.WholesaleMarket &&
            inventory.index === index
        ) ?? null
            return {
                index,
                kind: InventoryKind.WholesaleMarket,
                inventory: inventory,
            }
        }
    )
    const dispatch = useAppDispatch()
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                toggle(value)
                if (!value) {
                    dispatch(setSelectedShipInventoryId())
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ship</DialogTitle>
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
                        classNames={{
                            scrollArea: "h-[200px]",
                        }}
                        items={wholesaleMarketInventories}
                        contentCallback={({ inventory, index, kind }) => (
                            <InventoryCard inventory={inventory} index={index} kind={kind} />
                        )}
                        keyCallback={(item) => `${item.kind}-${item.index}`}
                    />
                </div>
                <DialogFooter>
                    <ExtendedButton className="w-full" disabled={true}>
            Earn
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
