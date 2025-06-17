import { QUERY_STATIC_SWR_MUTATION } from "@/singleton"
import { useSingletonHook } from "@/singleton"
import { useAppSelector, useAppDispatch, setSlotsDeliveryInventoryLeft, setSlotsStorageInventoryLeft } from "@/redux"
import { useGraphQLQueryStaticSwr } from "../swr"
import { useEffect } from "react"
import { InventoryKind, InventorySchema } from "@/types"
import _ from "lodash"

export const useSlotsLeft = () => {
    const inventories = useAppSelector(
        (state) => state.sessionReducer.inventories
    )
    const { swr: staticSwr } = useSingletonHook<
        ReturnType<typeof useGraphQLQueryStaticSwr>
    >(QUERY_STATIC_SWR_MUTATION)

    // we try to design a fomular to calculate the slots left
    const getSlotsLeft = ({
        kind,
        inventories,
        additionalInventories,
    }: GetSlotsLeftParams): GetSlotsLeftResult => {
        const mergedInventories = [...inventories]

        for (const additionalInventory of additionalInventories) {
            const additionalInventoryType = staticSwr.data?.data.inventoryTypes.find(
                (t) => t.id === additionalInventory.inventoryType
            )

            if (!additionalInventoryType) {
                throw new Error("Inventory type not found")
            }

            if (!additionalInventoryType.stackable) {
                mergedInventories.push(additionalInventory)
                continue
            }

            let merged = false

            for (const inventory of mergedInventories) {
                if (inventory.inventoryType === additionalInventory.inventoryType) {
                    const availableSpace = additionalInventoryType.maxStack - inventory.quantity
                    if (availableSpace > 0) {
                        const quantityToAdd = Math.min(availableSpace, additionalInventory.quantity)
                        inventory.quantity += quantityToAdd

                        const remaining = additionalInventory.quantity - quantityToAdd
                        if (remaining > 0) {
                            mergedInventories.push({
                                ...additionalInventory,
                                quantity: remaining,
                            })
                        }

                        merged = true
                        break
                    }
                }
            }

            // If no stack was found to merge into, just push it
            if (!merged) {
                mergedInventories.push(additionalInventory)
            }
        }

        let capacity = 0
        switch (kind) {
        case InventoryKind.Delivery:
            capacity = staticSwr.data?.data.defaultInfo.deliveryCapacity ?? 0
            break
        case InventoryKind.Storage:
            capacity = staticSwr.data?.data.defaultInfo.storageCapacity ?? 0
            break
        case InventoryKind.Tool:
            capacity = staticSwr.data?.data.defaultInfo.toolCapacity ?? 0
            break
        default:
            break
        }
        // thus, we count the total quantity of the merged inventories
        if (mergedInventories.length > capacity) {
            return {
                full: true,
            }
        } else {
            return {
                full: false,
                slotsLeft: capacity - mergedInventories.length
            }
        }
    }

    const selectedDeliveryInventoryIds = useAppSelector(
        (state) => state.selectionReducer.selectedDeliveryInventoryIds
    )

    // check if the selectedDeliveryInventoryIds is valid
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!staticSwr.data) return
        const result = getSlotsLeft({
            kind: InventoryKind.Delivery,
            inventories: inventories.filter((inventory) => inventory.kind === InventoryKind.Delivery).map(inventory => _.cloneDeep(inventory)),
            additionalInventories: inventories.filter((inventory) => selectedDeliveryInventoryIds.includes(inventory.id)).map(inventory => _.cloneDeep(inventory)),
        })
        if (result.full) {
            dispatch(setSlotsDeliveryInventoryLeft(0))
        } else {
            dispatch(setSlotsDeliveryInventoryLeft(result.slotsLeft ?? 0))
        }
    }, [staticSwr.data, inventories, selectedDeliveryInventoryIds])


    const selectedRetrieveInventoryIds = useAppSelector(
        (state) => state.selectionReducer.selectedRetrieveInventoryIds
    )

    useEffect(() => {
        if (!staticSwr.data) return
        const result = getSlotsLeft({
            kind: InventoryKind.Storage,
            inventories: inventories.filter((inventory) => inventory.kind === InventoryKind.Storage).map(inventory => _.cloneDeep(inventory)),
            additionalInventories: inventories.filter((inventory) => selectedRetrieveInventoryIds.includes(inventory.id)).map(inventory => _.cloneDeep(inventory)),
        })
        if (result.full) {
            dispatch(setSlotsStorageInventoryLeft(0))
        } else {
            dispatch(setSlotsStorageInventoryLeft(result.slotsLeft ?? 0))
        }
    }, [staticSwr.data, inventories, selectedRetrieveInventoryIds])
}

export interface GetSlotsLeftParams {
    kind: InventoryKind,
    inventories: Array<InventorySchema>
    additionalInventories: Array<InventorySchema>
}

export interface GetSlotsLeftResult {
    full: boolean
    // return undefined if full is true
    slotsLeft?: number
}

