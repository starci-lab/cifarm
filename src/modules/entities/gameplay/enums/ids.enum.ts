import { createObjectId } from "@/modules/common"

// Animal Enum
export enum AnimalId {
    Chicken = "chicken",
    Cow = "cow",
    Pig = "pig",
    Sheep = "sheep"
}

// Building Enum
export enum BuildingId {
    Coop = "coop",
    Barn = "barn",
    Home = "home"
}

// Upgrade Enum
export enum UpgradeId {
    CoopUpgrade1 = "coopUpgrade1",
    CoopUpgrade2 = "coopUpgrade2",
    CoopUpgrade3 = "coopUpgrade3",
    PastureUpgrade1 = "pastureUpgrade1",
    PastureUpgrade2 = "pastureUpgrade2",
    PastureUpgrade3 = "pastureUpgrade3"
}

// Crop Enum
export enum CropId {
    Carrot = "carrot",
    Potato = "potato",
    Pineapple = "pineapple",
    Watermelon = "watermelon",
    Cucumber = "cucumber",
    BellPepper = "bellPepper"
}

// Daily Reward Enum
export enum DailyRewardId {
    Day1 = "day1",
    Day2 = "day2",
    Day3 = "day3",
    Day4 = "day4",
    Day5 = "day5"
}

// Daily Reward Possibility Enum
export enum DailyRewardPossibilityId {
    Possibility1 = "possibility1",
    Possibility2 = "possibility2",
    Possibility3 = "possibility3",
    Possibility4 = "possibility4",
    Possibility5 = "possibility5"
}

// Supply Enum
export enum SupplyId {
    BasicFertilizer = "basicFertilizer",
    AnimalFeed = "animalFeed",
    AnimalPill = "animalPill",
}

// Tile Enum
export enum TileId {
    BasicTile = "basicTile",
}

// Tool Enum
export enum ToolId {
    Hand = "hand",
    Crate = "crate",
    ThiefHand = "thiefHand",
    WateringCan = "wateringCan",
    Herbicide = "herbicide",
    Pesticide = "pesticide",
    Hammer = "hammer",
    Relocate = "relocate",
}

// Product Enum
export enum ProductId {
    Egg = "egg",
    EggQuality = "eggQuality",
    Milk = "milk",
    MilkQuality = "milkQuality",
    Carrot = "carrot",
    CarrotQuality = "carrotQuality",
    Potato = "potato",
    PotatoQuality = "potatoQuality",
    Pineapple = "pineapple",
    PineappleQuality = "pineappleQuality",
    Watermelon = "watermelon",
    WatermelonQuality = "watermelonQuality",
    Cucumber = "cucumber",
    CucumberQuality = "cucumberQuality",
    BellPepper = "bellPepper",
    BellPepperQuality = "bellPepperQuality"
}

export enum SystemId {
    Activities = "activities",
    CropRandomness = "cropRandomness",
    AnimalRandomness = "animalRandomness",
    Starter = "starter",
    SpinInfo = "spinInfo",
    EnergyRegen = "energyRegen",
}

export enum KeyValueStoreId {
    CropGrowthLastSchedule = "cropGrowthLastSchedule",
    AnimalGrowthLastSchedule = "animalGrowthLastSchedule",
    EnergyRegenerationLastSchedule = "energyRegenerationLastSchedule"
}

export enum InventoryTypeId {
    CarrotSeed = "carrotSeed",
    PotatoSeed = "potatoSeed",
    PineappleSeed = "pineappleSeed",
    WatermelonSeed = "watermelonSeed",
    CucumberSeed = "cucumberSeed",
    BellPepperSeed = "bellPepperSeed",
    BasicFertilizer = "basicFertilizer",
    AnimalFeed = "animalFeed",
    AnimalPill = "animalPill",
    Egg = "egg",
    EggQuality = "eggQuality",
    Milk = "milk",
    MilkQuality = "milkQuality",
    Carrot = "carrot",
    CarrotQuality = "carrotQuality",
    Potato = "potato",
    PotatoQuality = "potatoQuality",
    Pineapple = "pineapple",
    PineappleQuality = "pineappleQuality",
    Watermelon = "watermelon",
    WatermelonQuality = "watermelonQuality",
    Cucumber = "cucumber",
    CucumberQuality = "cucumberQuality",
    BellPepper = "bellPepper",
    BellPepperQuality = "bellPepperQuality",
    Hand = "hand",
    Crate = "crate",
    WateringCan = "wateringCan",
    Herbicide = "herbicide",
    Pesticide = "pesticide",
    Hammer = "hammer",
    Relocate = "relocate",
}

export enum PlacedItemTypeId {
    Chicken = "chicken",
    Cow = "cow",
    Pig = "pig",
    Sheep = "sheep",
    Coop = "coop",
    Barn = "barn",
    Home = "home",
    BasicTile = "basicTile",
}

const objectIdMap: Record<string, string> = {
    [createObjectId(AnimalId.Chicken)]: AnimalId.Chicken,
    [createObjectId(AnimalId.Cow)]: AnimalId.Cow,
    [createObjectId(AnimalId.Pig)]: AnimalId.Pig,
    [createObjectId(AnimalId.Sheep)]: AnimalId.Sheep,

    // building ids
    [createObjectId(BuildingId.Coop)]: BuildingId.Coop,
    [createObjectId(BuildingId.Barn)]: BuildingId.Barn,
    [createObjectId(BuildingId.Home)]: BuildingId.Home,

    // crop ids
    [createObjectId(CropId.Carrot)]: CropId.Carrot,
    [createObjectId(CropId.Potato)]: CropId.Potato,
    [createObjectId(CropId.Pineapple)]: CropId.Pineapple,
    [createObjectId(CropId.Watermelon)]: CropId.Watermelon,
    [createObjectId(CropId.Cucumber)]: CropId.Cucumber,
    [createObjectId(CropId.BellPepper)]: CropId.BellPepper,

    // placed item types
    [createObjectId(PlacedItemTypeId.Chicken)]: PlacedItemTypeId.Chicken,
    [createObjectId(PlacedItemTypeId.Cow)]: PlacedItemTypeId.Cow,
    [createObjectId(PlacedItemTypeId.Pig)]: PlacedItemTypeId.Pig,
    [createObjectId(PlacedItemTypeId.Sheep)]: PlacedItemTypeId.Sheep,
    [createObjectId(PlacedItemTypeId.Coop)]: PlacedItemTypeId.Coop,
    [createObjectId(PlacedItemTypeId.Barn)]: PlacedItemTypeId.Barn,
    [createObjectId(PlacedItemTypeId.Home)]: PlacedItemTypeId.Home,
    [createObjectId(PlacedItemTypeId.BasicTile)]: PlacedItemTypeId.BasicTile,

    // inventory types
    [createObjectId(InventoryTypeId.CarrotSeed)]: InventoryTypeId.CarrotSeed,
    [createObjectId(InventoryTypeId.PotatoSeed)]: InventoryTypeId.PotatoSeed,
    [createObjectId(InventoryTypeId.PineappleSeed)]: InventoryTypeId.PineappleSeed,
    [createObjectId(InventoryTypeId.WatermelonSeed)]: InventoryTypeId.WatermelonSeed,
    [createObjectId(InventoryTypeId.CucumberSeed)]: InventoryTypeId.CucumberSeed,
    [createObjectId(InventoryTypeId.BellPepperSeed)]: InventoryTypeId.BellPepperSeed,
    [createObjectId(InventoryTypeId.BasicFertilizer)]: InventoryTypeId.BasicFertilizer,
    [createObjectId(InventoryTypeId.AnimalFeed)]: InventoryTypeId.AnimalFeed,
    [createObjectId(InventoryTypeId.Egg)]: InventoryTypeId.Egg,
    [createObjectId(InventoryTypeId.EggQuality)]: InventoryTypeId.EggQuality,
    [createObjectId(InventoryTypeId.Milk)]: InventoryTypeId.Milk,
    [createObjectId(InventoryTypeId.MilkQuality)]: InventoryTypeId.MilkQuality,
    [createObjectId(InventoryTypeId.Hand)]: InventoryTypeId.Hand,
    [createObjectId(InventoryTypeId.Crate)]: InventoryTypeId.Crate,
    [createObjectId(InventoryTypeId.WateringCan)]: InventoryTypeId.WateringCan,
    [createObjectId(InventoryTypeId.Herbicide)]: InventoryTypeId.Herbicide,
    [createObjectId(InventoryTypeId.Pesticide)]: InventoryTypeId.Pesticide,
    [createObjectId(InventoryTypeId.Hammer)]: InventoryTypeId.Hammer,
    [createObjectId(InventoryTypeId.Relocate)]: InventoryTypeId.Relocate,

    // supply types
    [createObjectId(SupplyId.BasicFertilizer)]: SupplyId.BasicFertilizer,
    [createObjectId(SupplyId.AnimalFeed)]: SupplyId.AnimalFeed,
    [createObjectId(SupplyId.AnimalPill)]: SupplyId.AnimalPill,

    // tile types
    [createObjectId(TileId.BasicTile)]: TileId.BasicTile,

    // tool types
    [createObjectId(ToolId.Hand)]: ToolId.Hand,
    [createObjectId(ToolId.Crate)]: ToolId.Crate,
    [createObjectId(ToolId.ThiefHand)]: ToolId.ThiefHand,
    [createObjectId(ToolId.WateringCan)]: ToolId.WateringCan,
    [createObjectId(ToolId.Herbicide)]: ToolId.Herbicide,
    [createObjectId(ToolId.Pesticide)]: ToolId.Pesticide,
    [createObjectId(ToolId.Hammer)]: ToolId.Hammer,
    [createObjectId(ToolId.Relocate)]: ToolId.Relocate,
}

export const getId = <IdType extends string>(objectId: string): IdType => (objectIdMap[objectId]) as IdType