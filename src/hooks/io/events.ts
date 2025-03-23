import { WithStatus } from "@/modules/common"
import {
    UserSchema,
    InventorySchema,
    PlacedItemSchema,
} from "@/modules/entities"
import { DeepPartial } from "react-hook-form"
import { EmitActionPayload } from "./actions"

// in constrast with server, Receiver => Emitter, Emitter => Receiver
export enum ReceiverEventName {
  UserSynced = "user_synced",
  PlacedItemsSynced = "placed_items_synced",
  ActionEmitted = "action_emitted",
  InventoriesSynced = "inventories_synced",
}

export enum EmitterEventName {
  SyncPlacedItems = "sync_placed_items",
  BuyCropSeeds = "buy_crop_seeds",
  BuyFlowerSeeds = "buy_flower_seeds",
  BuyTool = "buy_tool",
  BuySupplies = "buy_supplies",
  BuyAnimal = "buy_animal",
  BuyFruit = "buy_fruit",
  BuyTile = "buy_tile",
  BuyBuilding = "buy_building",
  PlantSeed = "plant_seed",
  UseWateringCan = "use_watering_can",
  UsePesticide = "use_pesticide", 
  UseHerbicide = "use_herbicide",
  HarvestPlant = "harvest_plant",
  HarvestFruit = "harvest_fruit",
  HarvestAnimal = "harvest_animal",
}

// sync placed items
export interface SyncPlacedItemsMessage {
  placedItemIds: Array<string>;
}

// sync user
export interface UserSyncedMessage {
  data: DeepPartial<UserSchema>;
}

// sync inventories
export interface InventoriesSyncedMessage {
  data: Array<WithStatus<InventorySchema>>;
}

// sync placed items
export interface PlacedItemsSyncedMessage {
  data: Array<WithStatus<PlacedItemSchema>>;
}

// generic type for action emitted message
export interface ActionEmittedMessage {
  action: EmitActionPayload;
}

export interface InventorySyncedMessage {
  data: Array<WithStatus<InventorySchema>>;
}