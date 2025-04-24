import { TileId } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface TileSchema extends StaticAbstractSchema<TileId> {
    price?: number;
    isNft: boolean;
    availableInShop: boolean;
    unlockLevel?: number;
    sellable?: boolean;
    sellPrice?: number;
}