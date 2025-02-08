import { useUserEffects } from "./graphql"
import { useBuySeedsEffects } from "./useBuySeedsEffects"
import { useUpdateTutorialEffects } from "./useUpdateTutorialEffects"

export const useEffects = () => {
    useUpdateTutorialEffects()
    useBuySeedsEffects()
    useUserEffects()
}