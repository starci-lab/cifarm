import { PlacedItemSchema } from "@/modules/entities"
import { Socket } from "socket.io-client"

export interface UseIo {
    // the socket instance
    socket: Socket | null
    // connect method
    connect: () => void
}

export interface PlacedItemsSyncedMessage {
    //placed items
    placedItems: Array<PlacedItemSchema>
    //current user id, beneficial for debugging
    userId: string
}

export interface EmitActionPayload {
    userId: string
    placedItemId: string
    action?: ActionName
    success?: boolean
    data?: unknown
    reasonCode?: number
}

export type ActionEmittedMessage = Omit<EmitActionPayload, "userId">

export interface ThiefCropData {
    quantity: number
    cropId: string
}

export interface BuyTileData {
    price: number
    placedItemTileId: string
}

export interface BuyAnimalData {
    price: number
}

export interface HarvestCropData {
    quantity: number
    cropId: string
}

export interface ThiefAnimalProductData {
    quantity: number
    productId: string
}

export interface HarvestAnimalData {
    quantity: number
    productId: string
}
export interface HarvestFruitData {
    quantity: number
    productId : string
}

export interface ThiefFruitData {
    quantity: number
    productId: string
}

export interface SellData {
    quantity: number
}
export enum ActionName {
    WaterCrop = "watercrop",
    UsePesticide = "usepesticide",
    UseHerbicide = "useherbicide",
    UseFertilizer = "usefertilizer",
    HarvestCrop = "harvestcrop",
    PlantSeed = "plantseed",
    CureAnimal = "cureanimal",
    FeedAnimal = "feedanimal",
    HelpFeedAnimal = "helpfeedanimal",
    HarvestAnimal = "havestanimal",
    HelpCureAnimal = "helpcureanimal",
    HelpUseHerbicide = "helpuseherbicide",
    HelpUsePesticide = "helpusepesticide",
    HelpWater = "helpwater",
    ThiefAnimalProduct = "thiefanimalproduct",
    ThiefCrop = "thiefcrop",
    BuyTile = "buytile",
    BuyAnimal = "buyanimal",
    BuyBuilding = "buybuilding",
    BuyFruit = "buyfruit",
    Move = "move",
    Sell = "sell",
    UseBugNet = "usebugnet",
    UseFruitFertilizer = "usefruitfertilizer",
    HelpUseBugNet = "helpusebugnet",
    HelpUseFruitFertilizer = "helpusefruitfertilizer",
    HarvestFruit = "harvestfruit",
    ThiefFruit = "thieffruit",
}

export interface ShowFadeMessage {
    toNeighbor: boolean
}