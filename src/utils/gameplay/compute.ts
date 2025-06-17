import { formatNumber, NumberPattern } from "../format"

export const computeGrowthAcceleration = (growthAcceleration: number) => {
    return formatNumber(
        (growthAcceleration * 100) / (1000 + growthAcceleration),
        NumberPattern.Second
    )
}

export const computeQualityYieldChance = (qualityYieldChance: number) => {
    return formatNumber(
        (qualityYieldChance * 100) / (1000 + qualityYieldChance),
        NumberPattern.Second
    )
}

export const computeDiseaseResistance = (diseaseResistance: number) => {
    return formatNumber(
        (diseaseResistance * 100) / (1000 + diseaseResistance),
        NumberPattern.Second
    )
}

export const computeHarvestYieldBonus = (harvestYieldBonus: number) => {
    return formatNumber(
        (harvestYieldBonus * 100) / (1000 + harvestYieldBonus),
        NumberPattern.Second
    )
}
