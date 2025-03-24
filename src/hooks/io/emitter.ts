import {
    AnimalId,
    BuildingId,
    CropId,
    FlowerId,
    FruitId,
    Position,
    SupplyId,
    TileId,
    ToolId,
} from "@/modules/entities"

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
  UseAnimalFeed = "use_animal_feed",
  UseAnimalMedicine = "use_animal_medicine",
  UseFruitFertilizer = "use_fruit_fertilizer",
  UseBugNet = "use_bug_net",
  HelpUseHerbicide = "help_use_herbicide",
  HelpUsePesticide = "help_use_pesticide",
  HelpUseWateringCan = "help_use_watering_can",
  ThiefFruit = "thief_fruit",
  ThiefPlant = "thief_plant",
  ThiefAnimal = "thief_animal",
  DeliverInventory = "deliver_inventory",
  DeliverAdditionalInventory = "deliver_additional_inventory",
  RetainInventory = "retain_inventory",
  MoveInventory = "move_inventory",
  Move = "move",
  ClaimDailyReward = "claim_daily_reward",
}

export interface BuySuppliesMessage {
  supplyId: SupplyId;
  quantity: number;
}

export interface BuyToolMessage {
  toolId: ToolId;
}

export interface BuyCropSeedsMessage {
  cropId: CropId;
  quantity: number;
}

export interface BuyFlowerSeedsMessage {
  flowerId: FlowerId;
  quantity: number;
}

export interface BuyFruitMessage {
  fruitId: FruitId;
  position: Position;
}

export interface BuyAnimalMessage {
  animalId: AnimalId;
  position: Position;
}

export interface BuyBuildingMessage {
  buildingId: BuildingId;
  position: Position;
}

export interface BuyTileMessage {
  tileId: TileId;
  position: Position;
}

export interface PlantSeedMessage {
  inventorySeedId: string;
  placedItemTileId: string;
}

export interface HarvestPlantMessage {
  placedItemTileId: string;
}

export interface UseWateringCanMessage {
  placedItemTileId: string;
}

export interface UsePesticideMessage {
  placedItemTileId: string;
}

export interface UseHerbicideMessage {
  placedItemTileId: string;
}

export interface UseAnimalFeedMessage {
  placedItemAnimalId: string;
  inventorySupplyId: string;
}

export interface UseAnimalMedicineMessage {
  placedItemTileId: string;
}

export interface HarvestAnimalMessage {
  placedItemAnimalId: string;
}

export interface UseFruitFertilizerMessage {
  placedItemFruitId: string;
  inventorySupplyId: string;
}

export interface UseBugNetMessage {
  placedItemFruitId: string;
}

export interface HarvestFruitMessage {
  placedItemFruitId: string;
}

export interface HelpUseHerbicideMessage {
  placedItemTileId: string;
}

export interface HelpUsePesticideMessage {
  placedItemTileId: string;
}

export interface HelpUseWateringCanMessage {
  placedItemTileId: string;
}

export interface ThiefFruitMessage {
  placedItemFruitId: string;
}

export interface ThiefPlantMessage {
  placedItemPlantId: string;
}

export interface ThiefAnimalMessage {
  placedItemAnimalId: string;
}

export interface DeliverInventoryMessage {
  index: number;
  inventoryId: string;
  quantity: number;
}

export interface DeliverAdditionalInventoryMessage {
  index: number;
  inventoryId: string;
  quantity: number;
}

export interface RetainInventoryMessage {
  inventoryId: string;
}

export interface MoveInventoryMessage {
  inventoryId: string;
  index: number;
  isTool: boolean;
}

export interface MoveMessage {
  placedItemId: string;
  position: Position;
}


