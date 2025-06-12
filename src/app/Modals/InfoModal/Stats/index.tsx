import { StatsAttributeName, statsAttributeNameMap } from "@/modules/blockchain"
import React, { FC } from "react"
import { List } from "@/components"
import { computeDiseaseResistance, computeHarvestYieldBonus, computeGrowthAcceleration, computeQualityYieldChance } from "@/modules/entities"

interface StatsProps {
    growthAcceleration?: number
    qualityYield?: number
    diseaseResistance?: number
    harvestYieldBonus?: number
}

export const Stats: FC<StatsProps> = ({ growthAcceleration, qualityYield, diseaseResistance, harvestYieldBonus }) => {
    return <List
        enableScroll={false}
        items={
            [...Object.values(StatsAttributeName)]
        } contentCallback={(name) => {
            switch (name) {
            case StatsAttributeName.GrowthAcceleration:
                return <div className="flex justify-between px-3 py-2 bg-content-2">
                    <div className="text-muted-foreground">{statsAttributeNameMap[name].name}</div>
                    <div>{growthAcceleration} ({`${computeGrowthAcceleration(growthAcceleration || 0)}%`})</div>
                </div>
            case StatsAttributeName.QualityYield:
                return <div className="flex justify-between px-3 py-2 bg-content-2">
                    <div className="text-muted-foreground">{statsAttributeNameMap[name].name}</div>
                    <div>{qualityYield} ({`${computeQualityYieldChance(qualityYield || 0)}%`})</div>
                </div>
            case StatsAttributeName.DiseaseResistance:
                return <div className="flex justify-between px-3 py-2 bg-content-2">
                    <div className="text-muted-foreground">{statsAttributeNameMap[name].name}</div>
                    <div>{diseaseResistance} ({`${computeDiseaseResistance(diseaseResistance || 0)}%`})</div>
                </div>
            case StatsAttributeName.HarvestYieldBonus:
                return <div className="flex justify-between px-3 py-2 bg-content-2">
                    <div className="text-muted-foreground">{statsAttributeNameMap[name].name}</div>
                    <div>{harvestYieldBonus} ({`${computeHarvestYieldBonus(harvestYieldBonus || 0)}%`})</div>
                </div>
            }
        }} />
}


