export enum GameplayLayer {
    Tilemap = "Tilemap",
    Effects = "Effects",
}
  
export interface GameplayLayerData {
    depth: number;
  }
  
export const gameplayMap: Record<GameplayLayer, GameplayLayerData> = {
    [GameplayLayer.Tilemap]: {
        depth: 0,
    },
    [GameplayLayer.Effects]: {
        depth: 1000,
    },
}
  
// Layer depth constants to define stacking order
const DEEP_LEVEL_INCREMENT = 100
  
export interface CalculateGameplayDepthParams {
    layer: GameplayLayer;
    layerDepth?: number;
    additionalDepth?: number;
  }
  
// Using the function with the new parameter names
export const calculateGameplayDepth = ({
    layer,
    layerDepth = 0,
    additionalDepth = 0,
}: CalculateGameplayDepthParams) => {
    if (0 > layerDepth || layerDepth > 9) {
        throw new Error("Invalid layer depth")
    }
    return (
        gameplayMap[layer].depth + layerDepth * DEEP_LEVEL_INCREMENT + additionalDepth
    )
}
  