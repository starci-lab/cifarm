import { WithStatus } from "@/modules/common"
import {
    UserSchema,
    InventorySchema,
    PlacedItemSchema,
} from "@/modules/entities"
import { PartialDeep } from "type-fest"
import { EmitActionPayload } from "./actions"

// in constrast with server, Receiver => Emitter, Emitter => Receiver
export enum ReceiverEventName {
  UserSynced = "user_synced",
  PlacedItemsSynced = "placed_items_synced",
  ActionEmitted = "action_emitted",
  InventoriesSynced = "inventories_synced",
  CropSeedsBought = "crop_seeds_bought",
  FlowerSeedsBought = "flower_seeds_bought",
  SuppliesBought = "supplies_bought",
  ToolBought = "tool_bought",
  DailyRewardClaimed = "daily_reward_claimed",
  StopBuying = "stop_buying",
  ForceSyncPlacedItemsResponsed = "force_sync_placed_items_responsed",
  Disconnected = "disconnected",
}

// sync placed items
export interface SyncPlacedItemsMessage {
  placedItemIds: Array<string>;
}

// sync user
export interface UserSyncedMessage {
  data: PartialDeep<UserSchema>;
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

export interface ForceSyncPlacedItemsMessage {
  ids: Array<string>;
}

