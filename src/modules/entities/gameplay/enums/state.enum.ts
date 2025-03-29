// Crop Current State Enum
export enum PlantCurrentState {
    Normal = "normal",
    NeedWater = "needWater",
    IsWeedy = "isWeedy",
    IsInfested = "isInfested",
    FullyMatured = "fullyMatured",
}

// Animal Current State Enum
export enum AnimalCurrentState {
    Normal = "normal",
    Hungry = "hungry",
    Sick = "sick",
    Yield = "yield",
}

// Fruit Current State Enum
export enum FruitCurrentState {
    Normal = "normal",
    NeedFertilizer = "needFertilizer",
    IsBuggy = "isBuggy",
    FullyMatured = "fullyMatured",
}

// Fruit Current State Enum
export enum BeeHouseCurrentState {
    Normal = "normal",
    Yield = "yield"
}

// Building Current State Enum
export enum BuildingCurrentState {
    Normal = "normal",
    Upgraded = "upgraded"
}

// Building Kind
export enum BuildingKind {
    // neutral mean normal building, no special function
    Neutral = "neutral",
    // bee house mean building that can produce honey
    BeeHouse = "beeHouse",
}
