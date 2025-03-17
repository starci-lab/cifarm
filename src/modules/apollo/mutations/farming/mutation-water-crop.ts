import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation WaterCrop($request: WaterCropRequest!) {
        waterCrop(request: $request) {
            success
        }
    }
`

export enum MutationWaterCrop {
    Mutation1 = "mutation1",
}

export interface WaterCropRequest {
    placedItemTileId: string
}

export interface MutationWaterCropResponse {
    success: boolean
}

const mutationMap: Record<MutationWaterCrop, DocumentNode> = {
    [MutationWaterCrop.Mutation1]: mutation1,
}

export type MutationWaterCropParams = MutationParams<MutationWaterCrop, WaterCropRequest>

export const mutationWaterCrop = async ({
    mutation = MutationWaterCrop.Mutation1,
    request
}: MutationWaterCropParams) => {
    if (!request) {
        throw new Error("Request is required for water crop mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { waterCrop: MutationWaterCropResponse },
        MutationVariables<WaterCropRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 