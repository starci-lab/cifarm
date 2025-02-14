import { ProductSchema } from "./product"
import { UserSchema } from "./user"

export interface DeliveringProductSchema {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    quantity: number
    index: number
    userId?: string
    user?: UserSchema
    productId?: string
    product?: ProductSchema
}
