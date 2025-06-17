import {
    StatsAttributeName,
    statsAttributeNameMap,
} from "@/modules/blockchain"
import React, { FC } from "react"
import { List } from "@/components"
import {
    computeDiseaseResistance,
    computeHarvestYieldBonus,
    computeGrowthAcceleration,
    computeQualityYieldChance,
} from "@/utils"

interface StatsProps {
  growthAcceleration?: number;
  qualityYield?: number;
  diseaseResistance?: number;
  harvestYieldBonus?: number;
}

export const Stats: FC<StatsProps> = ({
    growthAcceleration,
    qualityYield,
    diseaseResistance,
    harvestYieldBonus,
}) => {
    return (
        <List
            enableScroll={false}
            items={[...Object.values(StatsAttributeName)]}
            contentCallback={(name) => {
                switch (name) {
                case StatsAttributeName.GrowthAcceleration:
                    return (
                        <div className="flex justify-between p-3 bg-content-2">
                            <div className="text-muted-foreground leading-none">
                                {statsAttributeNameMap[name].name}
                            </div>
                            <div className="leading-none">
                                {growthAcceleration} (
                                {`${computeGrowthAcceleration(growthAcceleration || 0)}%`})
                            </div>
                        </div>
                    )
                case StatsAttributeName.QualityYield:
                    return (
                        <div className="flex justify-between p-3 bg-content-2">
                            <div className="text-muted-foreground leading-none">
                                {statsAttributeNameMap[name].name}
                            </div>
                            <div className="leading-none">
                                {qualityYield} (
                                {`${computeQualityYieldChance(qualityYield || 0)}%`})
                            </div>
                        </div>
                    )
                case StatsAttributeName.DiseaseResistance:
                    return (
                        <div className="flex justify-between p-3 bg-content-2">
                            <div className="text-muted-foreground leading-none">
                                {statsAttributeNameMap[name].name}
                            </div>
                            <div className="leading-none">
                                {diseaseResistance} (
                                {`${computeDiseaseResistance(diseaseResistance || 0)}%`})
                            </div>
                        </div>
                    )
                case StatsAttributeName.HarvestYieldBonus:
                    return (
                        <div className="flex justify-between p-3 bg-content-2">
                            <div className="text-muted-foreground leading-none">
                                {statsAttributeNameMap[name].name}
                            </div>
                            <div className="leading-none">
                                {harvestYieldBonus} (
                                {`${computeHarvestYieldBonus(harvestYieldBonus || 0)}%`})
                            </div>
                        </div>
                    )
                }
            }}
        />
    )
}
