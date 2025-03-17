import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation HarvestCrop($request: HarvestCropRequest!) {
        harvestCrop(request: $request) {
            quantity
        }
    }
`

export enum MutationHarvestCrop {
    Mutation1 = "mutation1",
}

export interface HarvestCropRequest {
    placedItemTileId: string
}

export interface MutationHarvestCropResponse {
    quantity: number
}

const mutationMap: Record<MutationHarvestCrop, DocumentNode> = {
    [MutationHarvestCrop.Mutation1]: mutation1,
}

export type MutationHarvestCropParams = MutationParams<MutationHarvestCrop, HarvestCropRequest>

export const mutationHarvestCrop = async ({
    mutation = MutationHarvestCrop.Mutation1,
    request
}: MutationHarvestCropParams) => {
    if (!request) {
        throw new Error("Request is required for harvest crop mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { harvestCrop: MutationHarvestCropResponse },
        MutationVariables<HarvestCropRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 