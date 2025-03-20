import { useInventoriesEffects } from "./useInventoriesEffects"
import { usePlacedItemsEffects } from "./usePlacedItemsEffects"
import { useStaticEffects } from "./useStaticEffects"
import { useUserEffects } from "./useUserEffects"

export const useGraphQLQueryEffects = () => {
    useUserEffects()
    useInventoriesEffects()
    usePlacedItemsEffects()
    useStaticEffects()
}