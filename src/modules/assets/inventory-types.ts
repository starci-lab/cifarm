import { assetShopMap } from "./shop"
import { InventoryTypeId } from "@/types"
import { assetProductMap } from "./products"
import { assetSuppliesMap } from "./supplies"
import { assetToolsMap } from "./tools"
import { AssetData, AssetTextureData, Metadata } from "./types"

export interface AssetInventoryTypesData extends Metadata {
    base: AssetData
    phaser?: {
        base: AssetTextureData  
    }
}
export const assetInventoryTypesMap: Partial<Record<InventoryTypeId, AssetInventoryTypesData>> = {
    ...Object.fromEntries(
        Object.entries(assetProductMap).map(([key, { base, name, description, phaser }]) => [key, { base, name, description, phaser }])
    ),
    ...Object.fromEntries(
        Object.entries(assetSuppliesMap).map(([key, { base, name, description, phaser }]) => [key, { base, name, description, phaser }])
    ),
    ...Object.fromEntries(
        Object.entries(assetToolsMap).map(([key, { base, name, description, phaser }]) => [key, { base, name, description, phaser }])
    ),
    ...Object.fromEntries(
        Object.entries(assetShopMap.crops).map(([key, { base, name, description, phaser }]) => [`${key}Seed`, { base, name, description, phaser }])
    ),
    ...Object.fromEntries(
        Object.entries(assetShopMap.flowers).map(([key, { base, name, description, phaser }]) => [`${key}Seed`, { base, name, description, phaser }])
    ),
}