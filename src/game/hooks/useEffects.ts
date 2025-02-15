import { useApiEffects } from "./api"
import { useGraphQLEffects } from "./graphql"

export const useEffects = () => {
    useApiEffects()
    useGraphQLEffects()  
}