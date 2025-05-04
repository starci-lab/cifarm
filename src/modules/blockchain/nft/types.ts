export enum NFTRarityEnum {
    Common = "common",
    Rare = "rare",
    Epic = "epic",
}

export enum AttributeName {
    Stars = "stars",
    Rarity = "rarity",
    GrowthAcceleration = "growthAcceleration",
    QualityYield = "qualityYield",
    DiseaseResistance = "diseaseResistance",
    HarvestYieldBonus = "harvestYieldBonus",
    CurrentStage = "currentStage"
}

export enum StatsAttributeName {
    GrowthAcceleration = "growthAcceleration",
    QualityYield = "qualityYield",
    DiseaseResistance = "diseaseResistance",
    HarvestYieldBonus = "harvestYieldBonus"
}

export enum FruitPropertiesName {
    CurrentStage = "currentStage",
}


export interface StatsAttributeData {
    name: string
    tooltip: string
}   

export interface FruitPropertiesData {
    name: string
    tooltip: string
}

export const statsAttributeNameMap: Record<StatsAttributeName, StatsAttributeData> = {
    [StatsAttributeName.GrowthAcceleration]: {
        name: "Growth Acceleration",
        tooltip: "Growth acceleration is the rate at which the item grows. It is a percentage that is applied to the item.",
    },
    [StatsAttributeName.QualityYield]: {
        name: "Quality Yield Chance",
        tooltip: "Quality Yield Chance is the chance that the item will produce a higher quality yield.",
    },
    [StatsAttributeName.DiseaseResistance]: {
        name: "Disease Resistance",
        tooltip: "Disease Resistance is the chance that the item will not get diseased.",
    },
    [StatsAttributeName.HarvestYieldBonus]: {
        name: "Harvest Yield Bonus",
        tooltip: "Harvest Yield Bonus is the bonus that the item will produce when harvested.",
    },
}

export const fruitPropertiesNameMap: Record<FruitPropertiesName, FruitPropertiesData> = {
    [FruitPropertiesName.CurrentStage]: {
        name: "Current Stage",
        tooltip: "Current Stage is the current stage of the item.",
    },
}

