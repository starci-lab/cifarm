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

