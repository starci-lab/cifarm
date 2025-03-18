import { useGraphQLMutationEffects, useGraphQLQueryEffects } from "./graphql"
import { useModalsEffects } from "./modals"
import { useStatesEffects } from "./states"

export const useEffects = () => {
    useGraphQLMutationEffects()
    useGraphQLQueryEffects()
    useModalsEffects()
    useStatesEffects()
}
