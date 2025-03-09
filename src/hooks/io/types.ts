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
    Water = "Water",
    UsePesticide = "UsePesticide",
    UseHerbicide = "UseHerbicide",
    UseFertilizer = "UseFertilizer",
    HarvestCrop = "HarvestCrop",
    PlantSeed = "PlantSeed",
    CureAnimal = "CureAnimal",
    FeedAnimal = "FeedAnimal",
    CollectAnimalProduct = "CollectAnimalProduct",
    HelpCureAnimal = "HelpCureAnimal",
    HelpUseHerbicide = "HelpUseHerbicide",
    HelpUsePesticide = "HelpUsePesticide",
    HelpWater = "HelpWater",
    ThiefAnimalProduct = "ThiefAnimalProduct",
    ThiefCrop = "ThiefCrop",
}

export interface ShowFadeMessage {
    toNeighbor: boolean
}