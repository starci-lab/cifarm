import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HarvestFruit($request: HarvestFruitRequest!) {
        harvestFruit(request: $request) {
            quantity
        }
    }
`

export enum MutationHarvestFruit {
    Mutation1 = "mutation1",
}

export interface HarvestFruitRequest {
    placedItemFruitId: string
}

export interface MutationHarvestFruitResponse {
    quantity: number
}

const mutationMap: Record<MutationHarvestFruit, DocumentNode> = {
    [MutationHarvestFruit.Mutation1]: mutation1,
}

export type MutationHarvestFruitParams = MutationParams<MutationHarvestFruit, HarvestFruitRequest>

export const mutationHarvestFruit = async ({
    mutation = MutationHarvestFruit.Mutation1,
    request
}: MutationHarvestFruitParams) => {
    if (!request) {
        throw new Error("Request is required for harvest fruit mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { harvestFruit: MutationHarvestFruitResponse },
        MutationVariables<HarvestFruitRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 