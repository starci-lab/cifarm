import { useUserEffects } from "./graphql"
import { useBuySeedsEffects } from "./useBuySeedsEffects"
import { useHarvestCropEffects } from "./useHarvestCropEffects"
import { useUseHerbicideEffects } from "./useHerbicideEffects"
import { useUsePesticideEffects } from "./usePesticideEffects"
import { usePlantSeedEffects } from "./usePlantSeedEffects"
import { useUpdateTutorialEffects } from "./useUpdateTutorialEffects"
import { useWaterEffects } from "./useWaterEffects"

export const useEffects = () => {
    useUpdateTutorialEffects()
    useBuySeedsEffects()
    useUserEffects()
    usePlantSeedEffects()
    useWaterEffects()
    useUseHerbicideEffects()
    useUsePesticideEffects()
    useHarvestCropEffects()
}