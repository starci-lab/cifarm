import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation UseFruitFertilizer($request: UseFruitFertilizerRequest!) {
        useFruitFertilizer(request: $request)
    }
`

export enum MutationUseFruitFertilizer {
    Mutation1 = "mutation1",
}

export interface UseFruitFertilizerRequest {
    placedItemFruitId: string
    inventorySupplyId: string
}

const mutationMap: Record<MutationUseFruitFertilizer, DocumentNode> = {
    [MutationUseFruitFertilizer.Mutation1]: mutation1,
}

export type MutationUseFruitFertilizerParams = MutationParams<MutationUseFruitFertilizer, UseFruitFertilizerRequest>

export const mutationUseFruitFertilizer = async ({
    mutation = MutationUseFruitFertilizer.Mutation1,
    request
}: MutationUseFruitFertilizerParams) => {
    if (!request) {
        throw new Error("Request is required for use fruit fertilizer mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { useFruitFertilizer: null },
        MutationVariables<UseFruitFertilizerRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 