import { TileId } from "@/types"
import { StaticAbstractSchema } from "./abstract"

export interface TileSchema extends StaticAbstractSchema<TileId> {
    price?: number;
    isNFT: boolean;
    availableInShop: boolean;
    unlockLevel?: number;
    sellable?: boolean;
    sellPrice?: number;
}