import { useUserEffects } from "../graphql/useUserEffects"
import { useBuySeedsEffects } from "./useBuySeedsEffects"
import { useHarvestCropEffects } from "./useHarvestCropEffects"
import { useUseHerbicideEffects } from "./useHerbicideEffects"
import { useUsePesticideEffects } from "./usePesticideEffects"
import { usePlantSeedEffects } from "./usePlantSeedEffects"
import { useMoveInventoryEffects } from "./useMoveInventoryEffects"
import { useUpdateTutorialEffects } from "./useUpdateTutorialEffects"
import { useWaterEffects } from "./useWaterEffects"
import { useDeliverProductEffects } from "./useDeliverProductEffects"
import { useRetainProductEffects } from "./useRetainProductEffects"

export const useApiEffects = () => {
    useUpdateTutorialEffects()
    useBuySeedsEffects()
    useUserEffects()
    usePlantSeedEffects()
    useWaterEffects()
    useUseHerbicideEffects()
    useUsePesticideEffects()
    useHarvestCropEffects()
    useMoveInventoryEffects()
    useDeliverProductEffects()
    useRetainProductEffects()
}