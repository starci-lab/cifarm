import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { CropId } from "@/modules/entities"

const mutation1 = gql`
    mutation BuySeeds($request: BuySeedsRequest!) {
        buySeeds(request: $request)
    }
`

export enum MutationBuySeeds {
    Mutation1 = "mutation1",
}

export interface BuySeedsRequest {
    cropId: CropId
    quantity: number
}

const mutationMap: Record<MutationBuySeeds, DocumentNode> = {
    [MutationBuySeeds.Mutation1]: mutation1,
}

export type MutationBuySeedsParams = MutationParams<MutationBuySeeds, BuySeedsRequest>

export const mutationBuySeeds = async ({
    mutation = MutationBuySeeds.Mutation1,
    request
}: MutationBuySeedsParams) => {
    if (!request) {
        throw new Error("Request is required for buy seeds mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { buySeeds: null },
    MutationVariables<BuySeedsRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 