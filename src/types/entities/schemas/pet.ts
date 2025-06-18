import { PetId, PetType } from "@/types"
import { StaticAbstractSchema } from "./abstract"

export interface PetSchema extends StaticAbstractSchema<PetId> {
    availableInShop: boolean
    price?: number
    unlockLevel?: number
    sellPrice?: number
    type: PetType
    sellable?: boolean
}
