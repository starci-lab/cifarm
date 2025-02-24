import { BaseAssetKey } from "@/game/assets"
import { ItemQuantity } from "../../elements"
import { InventorySchema } from "@/modules/entities"

export enum InventoryTab {
    Menu = "Menu",
    Tiles = "Tiles",
    Products = "Products", 
    Seeds = "Seeds",
    Animals = "Animals",
    Tools = "Tools",
}

export interface InventoryTabData {
    iconKey: BaseAssetKey
}

export const defaultInventoryTab = InventoryTab.Menu

export interface DragItemParams {
    item: ItemQuantity
    pointer: Phaser.Input.Pointer
    data: InventorySchema
}