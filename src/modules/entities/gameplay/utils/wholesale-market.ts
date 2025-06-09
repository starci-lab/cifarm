import { InventoryType, InventoryKind, InventorySchema, BulkSchema, VaultData } from "@/modules/entities"
import { QueryStaticResponse } from "@/modules/apollo"
import { formatNumber } from "@/modules/common"
import { BulkPaid } from "@/modules/apollo"

export interface PartitionInventoriesParams {
    staticData: QueryStaticResponse;
    inventories: Array<InventorySchema>;
    bulkId: string;
}

export const partitionInventories = ({
    staticData,
    inventories,
    bulkId,
}: PartitionInventoriesParams) => {
    const productInventoryTypeIds = staticData.inventoryTypes
        ?.filter((inventoryType) => inventoryType.type === InventoryType.Product)
        .map((inventoryType) => inventoryType.id) ?? []

    const filteredInventories = inventories.filter(
        (inventory) =>
            productInventoryTypeIds.includes(inventory.inventoryType.toString()) &&
            inventory.kind === InventoryKind.Storage
    )

    const inventoryMap: Record<string, InventoryMapData> = {}

    const bulks = staticData.activeSeason?.bulks || []
    const currentBulk = bulks.find((bulk) => bulk.id === bulkId)
    if (!currentBulk) {
        throw new Error(`Bulk with ID ${bulkId} not found`)
    }

    for (const product of currentBulk.products) {
        const requiredQuantity = product.quantity
        const inventoryMapData: InventoryMapData = {
            inventories: [],
            totalQuantity: 0,
            enough: false,
            requiredQuantity,
        }

        for (const inventory of filteredInventories) {
            const inventoryType = staticData.inventoryTypes?.find(
                (inventoryType) => inventoryType.id === inventory.inventoryType.toString()
            )

            if (!inventoryType || inventoryType.type !== InventoryType.Product) continue

            if (inventoryType.product?.toString() === product.productId.toString()) {
                inventoryMapData.inventories.push(inventory)
                inventoryMapData.totalQuantity += inventory.quantity
            }
        }

        inventoryMapData.enough = inventoryMapData.totalQuantity >= requiredQuantity
        inventoryMap[product.productId.toString()] = inventoryMapData
    }

    return {
        inventoryMap,
    }
}


export interface InventoryMapData {
    inventories: Array<InventorySchema>
    totalQuantity: number
    enough: boolean
    requiredQuantity: number
}

export interface ComputePaidAmountParams {
    vaultData: VaultData
    bulk: BulkSchema
    bulkPaid: BulkPaid
}

export const computePaidAmount = ({
    vaultData,
    bulk,
    bulkPaid,
}: ComputePaidAmountParams) => {
    const { tokenLocked } = vaultData
    const { maxPaidAmount, maxPaidPercentage } = bulk
    return formatNumber(Math.min(
        tokenLocked * maxPaidPercentage,
        maxPaidAmount
    ) * (1 - bulkPaid.decrementPercentage))
}