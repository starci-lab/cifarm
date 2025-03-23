import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { CropId } from "@/modules/entities"

const mutation1 = gql`
    mutation BuyCropSeeds($request: BuyCropSeedsRequest!) {
        buyCropSeeds(request: $request)
    }
`

export enum MutationBuyCropSeeds {
    Mutation1 = "mutation1",
}

export interface BuyCropSeedsRequest {
    cropId: CropId
    quantity: number
}

const mutationMap: Record<MutationBuyCropSeeds, DocumentNode> = {
    [MutationBuyCropSeeds.Mutation1]: mutation1,
}

export type MutationBuyCropSeedsParams = MutationParams<MutationBuyCropSeeds, BuyCropSeedsRequest>

export const mutationBuyCropSeeds = async ({
    mutation = MutationBuyCropSeeds.Mutation1,
    request
}: MutationBuyCropSeedsParams) => {
    if (!request) {
        throw new Error("Request is required for buy crop seeds mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { buyCropSeeds: null },
    MutationVariables<BuyCropSeedsRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 