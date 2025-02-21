import { useUserEffects } from "../graphql/useUserEffects"
import { useBuySeedsEffects } from "./useBuySeedsEffects"
import { useBuyTileEffects } from "./useBuyTileEffects"
import { useConstructBuildingEffects } from "./useConstructBuilding"
import { useHarvestCropEffects } from "./useHarvestCropEffects"
import { useUseHerbicideEffects } from "./useHerbicideEffects"
import { useUsePesticideEffects } from "./usePesticideEffects"
import { usePlantSeedEffects } from "./usePlantSeedEffects"
import { useMoveInventoryEffects } from "./useMoveInventoryEffects"
import { useUpdateTutorialEffects } from "./useUpdateTutorialEffects"
import { useWaterEffects } from "./useWaterEffects"
import { useDeliverProductEffects } from "./useDeliverProductEffects"
import { useRetainProductEffects } from "./useRetainProductEffects"
import { useFollowEffects } from "./useFollowEffects"
import { useUnfollowEffects } from "./useUnfollowEffects"
import { useVisitEffects } from "./useVisitEffects"
import { useReturnEffects } from "./useReturnEffects"
import { useHelpUseHerbicideEffects } from "./helpUseHerbicideEffects"
import { useHelpUsePesticideEffects } from "./helpUsePesticideEffects"
import { useThiefCropEffects } from "./thiefCropEffects"
import { useHelpWaterEffects } from "./helpWaterEffects"

export const useApiEffects = () => {
    useUpdateTutorialEffects()
    useBuySeedsEffects()
    useUserEffects()
    usePlantSeedEffects()
    useWaterEffects()
    useUseHerbicideEffects()
    useUsePesticideEffects()
    useHarvestCropEffects()
    useConstructBuildingEffects()
    useBuyTileEffects()
    useMoveInventoryEffects()
    useDeliverProductEffects()
    useRetainProductEffects()
    useFollowEffects()
    useUnfollowEffects()
    useVisitEffects()
    useReturnEffects()
    useHelpUseHerbicideEffects()
    useHelpUsePesticideEffects()
    useHelpWaterEffects()
    useThiefCropEffects()
}