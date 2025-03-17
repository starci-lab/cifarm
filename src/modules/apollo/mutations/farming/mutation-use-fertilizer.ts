import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UseFertilizer($request: UseFertilizerRequest!) {
        useFertilizer(request: $request)
    }
`

export enum MutationUseFertilizer {
    Mutation1 = "mutation1",
}

export interface UseFertilizerRequest {
    inventorySupplyId: string
    placedItemTileId: string
}

const mutationMap: Record<MutationUseFertilizer, DocumentNode> = {
    [MutationUseFertilizer.Mutation1]: mutation1,
}

export type MutationUseFertilizerParams = MutationParams<MutationUseFertilizer, UseFertilizerRequest>

export const mutationUseFertilizer = async ({
    mutation = MutationUseFertilizer.Mutation1,
    request
}: MutationUseFertilizerParams) => {
    if (!request) {
        throw new Error("Request is required for use fertilizer mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { useFertilizer: null },
        MutationVariables<UseFertilizerRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 