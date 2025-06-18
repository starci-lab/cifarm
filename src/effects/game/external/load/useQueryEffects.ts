import { useInventoriesEffects } from "./useInventoriesEffects"
import { usePlacedItemsEffects } from "./usePlacedItemsEffects"
import { useStaticEffects } from "./useStaticEffects"
import { useUserEffects } from "./useUserEffects"

export const useQueryEffects = () => {
    useUserEffects()
    useInventoriesEffects()
    usePlacedItemsEffects()
    useStaticEffects()
}
