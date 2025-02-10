import { useUserEffects } from "./graphql"
import { useBuySeedsEffects } from "./useBuySeedsEffects"
import { usePlantSeedEffects } from "./usePlantSeedEffects"
import { useUpdateTutorialEffects } from "./useUpdateTutorialEffects"

export const useEffects = () => {
    useUpdateTutorialEffects()
    useBuySeedsEffects()
    useUserEffects()
    usePlantSeedEffects()
}