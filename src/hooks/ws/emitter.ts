import {
    AnimalId,
    BuildingId,
    CropId,
    FlowerId,
    FruitId,
    PetId,
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
  HelpUseAnimalMedicine = "help_use_animal_medicine",
  HelpUseBugNet = "help_use_bug_net",
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
  UseFertilizer = "use_fertilizer",
  Sell = "sell",
  UpgradeBuilding = "upgrade_building",
  HarvestBeeHouse = "harvest_bee_house",
  Return = "return",
  Visit = "visit",
  ThiefBeeHouse = "thief_bee_house",
  BuyPet = "buy_pet",
  ForceSyncPlacedItems = "force_sync_placed_items",
  PlaceNFT = "place_nft",
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

export interface BuyPetMessage {
  petId: PetId;
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
  placedItemAnimalId: string;
}

export interface HelpUseAnimalMedicineMessage {
  placedItemAnimalId: string;
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
  placedItemTileId: string;
}

export interface ThiefAnimalMessage {
  placedItemAnimalId: string;
}

export interface DeliverInventoryMessage {
  inventoryId: string;
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

export interface UseFertilizerMessage {
  placedItemTileId: string;
  inventorySupplyId: string;
}

export interface HelpUseBugNetMessage {
  placedItemFruitId: string;
}

export interface SellMessage {
  placedItemId: string;
}

export interface UpgradeBuildingMessage {
  placedItemBuildingId: string;
}

export interface HarvestBeeHouseMessage {
  placedItemBuildingId: string;
}

export interface ThiefBeeHouseMessage {
  placedItemBuildingId: string;
}

export interface BuyPetMessage {
  petId: PetId;
}

export interface PlaceNFTMessage {
  placedItemId: string;
  position: Position;
}

