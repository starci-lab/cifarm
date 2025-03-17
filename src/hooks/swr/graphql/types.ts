import { MutationParams } from "@/modules/apollo/types"

export interface WithMutationParams<T> {
    params: MutationParams<T>
} 