import { useHelpUseHerbicideEffects } from "./helpUseHerbicideEffects"
import { useHelpUsePesticideEffects } from "./helpUsePesticideEffects"
import { useHelpWaterEffects } from "./helpWaterEffects"
import { useThiefCropEffects } from "./thiefCropEffects"
import { useBuyAnimalEffects } from "./useBuyAnimalEffects"
import { useBuySeedsEffects } from "./useBuySeedsEffects"
import { useBuySuppliesEffects } from "./useBuySuppliesEffect"
import { useBuyTileEffects } from "./useBuyTileEffects"
import { useClaimDailyRewardEffects } from "./useClaimDailyRewardEffects"
import { useConstructBuildingEffects } from "./useConstructBuilding"
import { useCureAnimalEffects } from "./useCureAnimalEffects"
import { useDeliverMoreProductEffects } from "./useDeliverMoreProductEffects"
import { useDeliverProductEffects } from "./useDeliverProductEffects"
import { useFeedAnimalEffects } from "./useFeedAnimalEffects"
import { useFollowEffects } from "./useFollowEffects"
import { useHarvestCropEffects } from "./useHarvestCropEffects"
import { useUseHerbicideEffects } from "./useHerbicideEffects"
import { useMoveEffects } from "./useMoveEffects"
import { useMoveInventoryEffects } from "./useMoveInventoryEffects"
import { useUsePesticideEffects } from "./usePesticideEffects"
import { usePlantSeedEffects } from "./usePlantSeedEffects"
import { useRetainProductEffects } from "./useRetainProductEffects"
import { useReturnEffects } from "./useReturnEffects"
import { useUnfollowEffects } from "./useUnfollowEffects"
import { useUpdateFollowXEffects } from "./useUpdateFollowXEffects"
import { useUpdateTutorialEffects } from "./useUpdateTutorialEffects"
import { useUpgradeBuildingEffects } from "./useUpgradeBuildingEffects"
import { useUseFertilizerEffects } from "./useUseFertilizerEffects"
import { useVisitEffects } from "./useVisitEffects"
import { useWaterEffects } from "./useWaterEffects"
import { useBuyToolEffects } from "./useBuyToolEffects"
import { useSellEffects } from "./useSellEffects"

export const useApiEffects = () => {
    useUpdateTutorialEffects()
    useBuySeedsEffects()
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
    useBuyAnimalEffects()
    useClaimDailyRewardEffects()
    useBuySuppliesEffects()
    useFeedAnimalEffects()
    useCureAnimalEffects()
    useUseFertilizerEffects()
    useUpdateFollowXEffects()
    useUpgradeBuildingEffects()
    useDeliverMoreProductEffects()
    useMoveEffects()
    useBuyToolEffects()
    useSellEffects()
}