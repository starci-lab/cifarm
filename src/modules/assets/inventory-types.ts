import { assetShopMap } from "./shop"
import { InventoryTypeId } from "../entities"
import { assetProductMap } from "./products"
import { assetSuppliesMap } from "./supplies"
import { assetToolsMap } from "./tools"
import { AssetData, Metadata } from "./types"

export interface AssetInventoryTypesData extends Metadata {
    base: AssetData
}
export const assetInventoryTypesMap: Partial<Record<InventoryTypeId, AssetInventoryTypesData>> = {
    ...Object.fromEntries(
        Object.entries(assetProductMap).map(([key, { base, name, description }]) => [key, { base, name, description }])
    ),
    ...Object.fromEntries(
        Object.entries(assetSuppliesMap).map(([key, { base, name, description }]) => [key, { base, name, description }])
    ),
    ...Object.fromEntries(
        Object.entries(assetToolsMap).map(([key, { base, name, description }]) => [key, { base, name, description }])
    ),
    ...Object.fromEntries(
        Object.entries(assetShopMap.crops).map(([key, { base, name, description }]) => [`${key}Seed`, { base, name, description }])
    ),
    ...Object.fromEntries(
        Object.entries(assetShopMap.flowers).map(([key, { base, name, description }]) => [`${key}Seed`, { base, name, description }])
    ),
}