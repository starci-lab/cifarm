import { StaticAbstractSchema } from "./abstract"
import { ProductId, ProductType } from "../enums"

export interface ProductSchema extends StaticAbstractSchema<ProductId> {
    isQuality: boolean
    goldAmount: number
    tokenAmount: number
    type: ProductType
    crop: string
    animal: string
    fruit: string
    flower: string
    building: string
}
