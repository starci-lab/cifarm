import { TileId } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface TileSchema extends StaticAbstractSchema<TileId> {
    price?: number;
    maxOwnership?: number;
    isNft: boolean;
    qualityProductChanceStack: number;
    qualityProductChanceLimit: number;
    availableInShop: boolean;
    unlockLevel?: number;
    sellable: boolean;
    sellPrice?: number;
}