import { assetShopMap } from "./shop"
import { InventoryTypeId } from "../entities"
import { assetProductsMap } from "./products"
import { assetSuppliesMap } from "./supplies"
import { assetToolsMap } from "./tools"
import { AssetData } from "./types"

export interface AssetInventoryTypesData {
    base: AssetData
}
export const assetInventoryTypesMap: Partial<Record<InventoryTypeId, AssetInventoryTypesData>> = {
    ...Object.fromEntries(
        Object.entries(assetProductsMap).map(([key, base]) => [key, base])
    ),
    ...Object.fromEntries(
        Object.entries(assetSuppliesMap).map(([key, base]) => [key, base])
    ),
    ...Object.fromEntries(
        Object.entries(assetToolsMap).map(([key, base]) => [key, base])
    ),
    ...Object.fromEntries(
        Object.entries(assetShopMap.crops).map(([key, base]) => [`${key}Seed`, { base }])
    ),
    ...Object.fromEntries(
        Object.entries(assetShopMap.flowers).map(([key, base]) => [`${key}Seed`, { base }])
    ),
}