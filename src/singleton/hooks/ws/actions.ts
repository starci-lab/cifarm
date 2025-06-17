import { PlacedItemSchema } from "@/types"
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
  BuyDecoration = "buy_decoration",
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