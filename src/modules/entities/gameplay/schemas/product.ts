import { AbstractSchema } from "./abstract"
import { AnimalSchema } from "./animal"
import { CropSchema } from "./crop"
import { ProductType } from "../enums"
import { InventoryTypeSchema } from "./inventory-type"
import { DeliveringProductSchema } from "./delivering-product"

export interface ProductSchema extends AbstractSchema {
    isQuality: boolean
    goldAmount: number
    tokenAmount: number
    type: ProductType
    cropId?: string
    crop: CropSchema
    animalId?: string
    animal: AnimalSchema
    inventoryTypeId: string
    inventoryType: InventoryTypeSchema
    deliveringProducts?: Array<DeliveringProductSchema>
}
