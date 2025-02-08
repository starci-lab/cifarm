export enum SceneLayer {
  UI = "ui",
  Modal = "modal",
  Tutorial = "tutorial",
  Overlay = "overlay",
}

export interface UISceneLayerData {
  depth: number;
}

export const layerMap: Record<SceneLayer, UISceneLayerData> = {
    [SceneLayer.UI]: {
        depth: 1000,
    },
    [SceneLayer.Modal]: {
        depth: 2000,
    },
    [SceneLayer.Tutorial]: {
        depth: 3000,
    },
    [SceneLayer.Overlay]: {
        depth: 4000,
    },
}

// Layer depth constants to define stacking order
export const DEEP_LEVEL_INCREMENT = 100

export interface CalculateDepthParams {
  layer: SceneLayer;
  layerDepth?: number;
  additionalDepth?: number;
}

// Using the function with the new parameter names
export const calculateDepth = ({
    layer,
    layerDepth = 0,
    additionalDepth = 0,
}: CalculateDepthParams) => {
    if (0 > layerDepth || layerDepth > 9) {
        throw new Error("Invalid layer depth")
    }
    return (
        layerMap[layer].depth + layerDepth * DEEP_LEVEL_INCREMENT + additionalDepth
    )
}
