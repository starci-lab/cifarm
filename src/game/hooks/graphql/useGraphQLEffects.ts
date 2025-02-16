import { useInventoriesEffects } from "./useInventoriesEffects"
import { useUserEffects } from "./useUserEffects"

export const useGraphQLEffects = () => {
    useUserEffects()
    useInventoriesEffects()
}