import { TerrainId, TerrainType } from "@/types"
import { StaticAbstractSchema } from "./abstract"

export interface TerrainSchema extends StaticAbstractSchema<TerrainId> {
    availableInShop: boolean
    price?: number
    unlockLevel?: number
    sellPrice?: number
    type: TerrainType
    sellable?: boolean  
}