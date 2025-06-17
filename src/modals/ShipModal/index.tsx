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
    DialogBody,
} from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { SHIP_MODAL_DISCLOSURE } from "@/singleton"
import { InventoryCard } from "./InventoryCard"
import { setSelectedShipInventoryId, useAppDispatch, useAppSelector } from "@/redux"
import { InventoryKind } from "@/modules/entities"

export const ShipModal: FC = () => {
    const { toggle, isOpen } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SHIP_MODAL_DISCLOSURE)
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const inventories = useAppSelector((state) => state.apiReducer.coreApi.inventories)

    const storageInventories = Array.from(
        { length: staticData?.defaultInfo.storageCapacity ?? 0 },
        (_, index) => {
            const inventory =
        inventories.find(
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
        { length: staticData?.defaultInfo.wholesaleMarketCapacity ?? 0 },
        (_, index) => {
            const inventory =
        inventories.find(
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
                <DialogBody>
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
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton className="w-full" disabled={true}>
            Earn
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
