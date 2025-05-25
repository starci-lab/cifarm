import { InventoryType, InventoryKind, InventorySchema } from "@/modules/entities"
import { StaticData } from "./types"

export interface PartitionInventoriesParams {
    staticData: StaticData;
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

    const bulks = staticData.wholesaleMarket?.bulks ?? []
    const currentBulk = bulks.find((bulk) => bulk.bulkId === bulkId)
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