import { useUserEffects } from "../graphql/useUserEffects"
import { useBuySeedsEffects } from "./useBuySeedsEffects"
import { useBuyTileEffects } from "./useBuyTileEffects"
import { useConstructBuildingEffects } from "./useConstructBuilding"
import { useHarvestCropEffects } from "./useHarvestCropEffects"
import { useUseHerbicideEffects } from "./useHerbicideEffects"
import { useUsePesticideEffects } from "./usePesticideEffects"
import { usePlantSeedEffects } from "./usePlantSeedEffects"
import { useUpdateInventoryIndexEffects } from "./useUpdateInventoryIndexEffects"
import { useUpdateTutorialEffects } from "./useUpdateTutorialEffects"
import { useWaterEffects } from "./useWaterEffects"

export const useApiEffects = () => {
    useUpdateTutorialEffects()
    useBuySeedsEffects()
    useUserEffects()
    usePlantSeedEffects()
    useWaterEffects()
    useUseHerbicideEffects()
    useUsePesticideEffects()
    useHarvestCropEffects()
    useUpdateInventoryIndexEffects()
    useConstructBuildingEffects()
    useBuyTileEffects()
}