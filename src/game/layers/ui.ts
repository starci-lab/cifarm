export enum UILayer {
  Base = "base",
  Modal = "modal",
  Overlay = "overlay",
}

export interface UILayerData {
  depth: number;
}

export const layerMap: Record<UILayer, UILayerData> = {
    [UILayer.Base]: {
        depth: 0,
    },
    [UILayer.Modal]: {
        depth: 1000,
    },
    [UILayer.Overlay]: {
        depth: 2000,
    },
}

// Layer depth constants to define stacking order
const DEEP_LEVEL_INCREMENT = 100

export interface CalculateUIDepthParams {
  layer: UILayer;
  layerDepth?: number;
  additionalDepth?: number;
}

// Using the function with the new parameter names
export const calculateUiDepth = ({
    layer,
    layerDepth = 0,
    additionalDepth = 0,
}: CalculateUIDepthParams) => {
    if (0 > layerDepth || layerDepth > 9) {
        throw new Error("Invalid layer depth")
    }
    return (
        layerMap[layer].depth + layerDepth * DEEP_LEVEL_INCREMENT + additionalDepth
    )
}
