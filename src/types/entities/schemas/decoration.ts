import { DecorationId, DecorationType } from "../enums"
import { AbstractSchema } from "./abstract"

export interface DecorationSchema extends AbstractSchema {
    displayId: DecorationId
    availableInShop: boolean
    price?: number
    sellPrice?: number
    type: DecorationType
    sellable?: boolean
    limited?: boolean
}