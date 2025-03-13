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

export interface HarvestCropData {
    quantity: number
    cropId: string
}

export enum ActionName {
    Water = "water",
    UsePesticide = "usepesticide",
    UseHerbicide = "useherbicide",
    UseFertilizer = "usefertilizer",
    HarvestCrop = "harvestcrop",
    PlantSeed = "plantseed",
    CureAnimal = "cureanimal",
    FeedAnimal = "feedanimal",
    CollectAnimalProduct = "collectanimalproduct",
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
}

export interface ShowFadeMessage {
    toNeighbor: boolean
}