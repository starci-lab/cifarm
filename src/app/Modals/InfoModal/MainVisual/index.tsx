"use client"
import { MainVisualType, MapAssetData } from "@/game"
import React, { FC } from "react"
import { SpriteVisual } from "./SpriteVisual"
import { SpineVisual } from "./SpineVisual"

export interface MainVisualProps {
    mapAssetData: MapAssetData
}

export const MainVisual: FC<MainVisualProps> = ({ mapAssetData }) => {  
    const renderMainVisual = () => {
        switch (mapAssetData.mainVisualType) {
        case MainVisualType.Spine:
            if (!mapAssetData.spineConfig) throw new Error("Spine config is required")
            return <SpineVisual spineConfig={mapAssetData.spineConfig}/>
        default:
            if (!mapAssetData.textureConfig) throw new Error("Texture config is required")
            return <SpriteVisual textureConfig={mapAssetData.textureConfig}/>
        }
    }
    return renderMainVisual()
}
