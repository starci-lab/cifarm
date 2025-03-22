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

export interface ThiefCropData {
  quantity: number;
  cropId: string;
}

export interface BuyTileData {
  price: number;
}

export interface BuyFruitData {
  price: number;
}

export interface BuyAnimalData {
  price: number;
}

export interface HarvestCropData {
  quantity: number;
  cropId: string;
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
  WaterCrop = "water_crop",
  UsePesticide = "use_pesticide",
  UseHerbicide = "use_herbicide",
  UseFertilizer = "use_fertilizer",
  HarvestCrop = "harvest_crop",
  PlantSeed = "plant_seed",
  CureAnimal = "cure_animal",
  FeedAnimal = "feed_animal",
  HelpFeedAnimal = "help_feed_animal",
  HarvestAnimal = "harvest_animal",
  HelpCureAnimal = "help_cure_animal",
  HelpUseHerbicide = "help_use_herbicide",
  HelpUsePesticide = "help_use_pesticide",
  HelpWaterCrop = "help_water_crop",
  ThiefAnimalProduct = "thief_animal_product",
  ThiefCrop = "thief_crop",
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
  price: number;
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
