import { PlacedItemSchema, PlacedItemType } from "@/modules/entities"
import { PartialDeep } from "type-fest"

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
  ThiefAnimal = "thief_animal",
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
  HarvestFruit = "harvest_fruit",
  ThiefFruit = "thief_fruit",
  UpgradeBuilding = "upgrade_building",
  HarvestBeeHouse = "harvest_bee_house",
  ThiefBeeHouse = "thief_bee_house",
  BuyPet = "buy_pet",
}

export interface EmitActionPayload {
  userId: string;
  placedItem: PartialDeep<PlacedItemSchema>;
  action?: ActionName;
  success?: boolean;
  data?: unknown;
  reasonCode?: string;
}

export enum ThiefPlantReasonCode {
  DogAssisted = "dog_assisted",
}

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

export interface BuyPetData {
  petId: string;
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

export interface HarvestBeeHouse {
  quantity: number;
  productId: string;
}

export interface ThiefBeeHouse {
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
  id: string;
  type: PlacedItemType;
}

export interface BuyBuildingData {
  buildingId: string;
}

export interface ThiefFruitData {
  quantity: number;
  productId: string;
}

export interface ThiefPlantData {
  quantity: number;
  productId: string;
  catAssistedSuccess?: boolean;
}

export interface ThiefAnimalData {
  quantity: number;
  productId: string;
}
