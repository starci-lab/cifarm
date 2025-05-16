import { StatsAttributeName, statsAttributeNameMap } from "@/modules/blockchain"
import React, { FC } from "react"
import { List } from "@/components"

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
                    <div className="text-secondary">{statsAttributeNameMap[name].name}</div>
                    <div>{growthAcceleration}</div>
                </div>
            case StatsAttributeName.QualityYield:
                return <div className="flex justify-between px-3 py-2 bg-content-2">
                    <div className="text-secondary">{statsAttributeNameMap[name].name}</div>
                    <div>{qualityYield}</div>
                </div>
            case StatsAttributeName.DiseaseResistance:
                return <div className="flex justify-between px-3 py-2 bg-content-2">
                    <div className="text-secondary">{statsAttributeNameMap[name].name}</div>
                    <div>{diseaseResistance}</div>
                </div>
            case StatsAttributeName.HarvestYieldBonus:
                return <div className="flex justify-between px-3 py-2 bg-content-2">
                    <div className="text-secondary">{statsAttributeNameMap[name].name}</div>
                    <div>{harvestYieldBonus}</div>
                </div>
            }
        }} />
}


