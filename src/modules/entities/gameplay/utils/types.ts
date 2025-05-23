import {
    Activities,
    AnimalInfo,
    AnimalSchema,
    BuildingSchema,
    CropInfo,
    CropSchema,
    DailyRewardInfo,
    DefaultInfo,
    EnergyRegen,
    FlowerSchema,
    FruitInfo,
    FruitSchema,
    InventoryTypeSchema,
    NFTCollections,
    PetSchema,
    PlacedItemTypeSchema,
    ProductSchema,
    SupplySchema,
    TileSchema,
    ToolSchema,
} from "../schemas"

export type StaticData = Partial<{
  activities: Activities;
  defaultInfo: DefaultInfo;
  pets: Array<PetSchema>;
  energyRegen: EnergyRegen;
  placedItemTypes: Array<PlacedItemTypeSchema>;
  crops: Array<CropSchema>;
  animals: Array<AnimalSchema>;
  buildings: Array<BuildingSchema>;
  tiles: Array<TileSchema>;
  dailyRewardInfo: DailyRewardInfo;
  tools: Array<ToolSchema>;
  inventoryTypes: Array<InventoryTypeSchema>;
  products: Array<ProductSchema>;
  supplies: Array<SupplySchema>;
  flowers: Array<FlowerSchema>;
  fruits: Array<FruitSchema>;
  fruitInfo: FruitInfo;
  cropInfo: CropInfo;
  animalInfo: AnimalInfo;
  nftCollections: NFTCollections;
}>