import { useApiEffects } from "./api"
import { useGraphQLEffects } from "./graphql"
import { useModalsEffects } from "./modals"
import { useStatesEffects } from "./states"

export const useEffects = () => {
    useApiEffects()
    useGraphQLEffects()  
    useModalsEffects()
    useStatesEffects()
}