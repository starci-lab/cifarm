import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { FlowerId } from "@/modules/entities"

const mutation1 = gql`
    mutation BuyFlowerSeeds($request: BuyFlowerSeedsRequest!) {
        buyFlowerSeeds(request: $request)
    }
`

export enum MutationBuyFlowerSeeds {
    Mutation1 = "mutation1",
}

export interface BuyFlowerSeedsRequest {
    flowerId: FlowerId
    quantity: number
}

const mutationMap: Record<MutationBuyFlowerSeeds, DocumentNode> = {
    [MutationBuyFlowerSeeds.Mutation1]: mutation1,
}

export type MutationBuyFlowerSeedsParams = MutationParams<MutationBuyFlowerSeeds, BuyFlowerSeedsRequest>

export const mutationBuyFlowerSeeds = async ({
    mutation = MutationBuyFlowerSeeds.Mutation1,
    request
}: MutationBuyFlowerSeedsParams) => {
    if (!request) {
        throw new Error("Request is required for buy flower seeds mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { buyFlowerSeeds: null },
    MutationVariables<BuyFlowerSeedsRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 