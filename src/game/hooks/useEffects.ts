import { useBuySeedsEffect } from "./useBuySeedsEffect"
import { useUpdateTutorialEffect } from "./useUpdateTutorialEffect"

export const useEffects = () => {
    useUpdateTutorialEffect()
    useBuySeedsEffect()
}