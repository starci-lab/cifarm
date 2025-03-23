import {
    InventorySchema,
    PlacedItemSchema,
    UserSchema,
} from "@/modules/entities"
import { DeepPartial } from "react-hook-form"
import { Socket } from "socket.io-client"

export interface UseIo {
  // the socket instance
  socket: Socket | null;
  // connect method
  connect: () => void;
}

export interface PlacedItemsSyncedMessage {
  //placed items
  data: Array<PlacedItemSchema>;
}

export interface EmitActionPayload {
  userId: string;
  placedItem: DeepPartial<PlacedItemSchema>;
  action?: ActionName;
  success?: boolean;
  data?: unknown;
  reasonCode?: number;
}

export type ActionEmittedMessage = Omit<EmitActionPayload, "userId">;

export interface ThiefPlantData {
  quantity: number;
  productId: string;
}

export interface BuyTileData {
  tileId: string;
}

export interface BuyFruitData {
  fruitId: string;
}

export interface BuyAnimalData {
  animalId: string;
}

export interface HarvestPlantData {
  quantity: number;
  productId: string;
}

export interface ThiefAnimalProductData {
  quantity: number;
  productId: string;
}

export interface HarvestAnimalData {
  quantity: number;
  productId: string;
}
export interface HarvestFruitData {
  quantity: number;
  productId: string;
}

export interface ThiefFruitData {
  quantity: number;
  productId: string;
}

export interface SellData {
  quantity: number;
}

export enum ActionName {
  UseWateringCan = "use_watering_can",
  UsePesticide = "use_pesticide",
  UseHerbicide = "use_herbicide",
  UseFertilizer = "use_fertilizer",
  HarvestPlant = "harvest_plant",
  PlantSeed = "plant_seed",
  UseAnimalMedicine = "use_animal_medicine",
  HelpUseAnimalMedicine = "help_use_animal_medicine",
  UseAnimalFeed = "use_animal_feed",
  HarvestAnimal = "harvest_animal",
  HelpUseHerbicide = "help_use_herbicide",
  HelpUsePesticide = "help_use_pesticide",
  HelpUseWateringCan = "help_use_watering_can",
  ThiefAnimalProduct = "thief_animal_product",
  ThiefPlant = "thief_plant",
  BuyTile = "buy_tile",
  BuyAnimal = "buy_animal",
  BuyBuilding = "buy_building",
  BuyFruit = "buy_fruit",
  Move = "move",
  Sell = "sell",
  UseBugNet = "use_bug_net",
  UseFruitFertilizer = "use_fruit_fertilizer",
  HelpUseBugNet = "help_use_bug_net",
  HelpUseFruitFertilizer = "help_use_fruit_fertilizer",
  HarvestFruit = "harvest_fruit",
  ThiefFruit = "thief_fruit",
}

export interface BuyBuildingData {
  buildingId: string;
}

export interface ShowFadeMessage {
  toNeighbor: boolean;
}

export interface InventorySyncedMessage {
  data: Array<InventorySchema>;
}

export interface UserSyncedMessage {
  data: UserSchema;
}
