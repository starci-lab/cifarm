import { useMutationEffects } from "./mutations"
import { useQueryEffects } from "./queries"

export const useGameplayEffects = () => {
    useMutationEffects()
    useQueryEffects()
}


