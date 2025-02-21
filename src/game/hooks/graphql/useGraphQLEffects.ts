import { useFolloweesEffects } from "./useFolloweesEffects"
import { useInventoriesEffects } from "./useInventoriesEffects"
import { useNeighborsEffects } from "./useNeighborsEffects"
import { useStaticEffects } from "./useStaticEffects"
import { useUserEffects } from "./useUserEffects"

export const useGraphQLEffects = () => {
    useUserEffects()
    useInventoriesEffects()
    useNeighborsEffects()
    useStaticEffects()
    useFolloweesEffects()
}