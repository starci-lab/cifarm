import { UuidAbstractEntity } from "./abstract"
import { AnimalEntity } from "./animal"
import { CropEntity } from "./crop"
import { ProductType } from "../enums"
import { InventoryTypeEntity } from "./inventory-type"
import { DeliveringProductEntity } from "./delivering-product"

export interface ProductEntity extends UuidAbstractEntity {
    isQuality: boolean
    goldAmount: number
    tokenAmount: number
    type: ProductType
    cropId?: string
    crop: CropEntity
    animalId?: string
    animal: AnimalEntity
    inventoryTypeId: string
    inventoryType: InventoryTypeEntity
    deliveringProducts?: Array<DeliveringProductEntity>
}
