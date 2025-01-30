import { ProductEntity } from "./product"
import { UserEntity } from "./user"

export interface DeliveringProductEntity {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    quantity: number
    index: number
    userId?: string
    user?: UserEntity
    productId?: string
    product?: ProductEntity
}
