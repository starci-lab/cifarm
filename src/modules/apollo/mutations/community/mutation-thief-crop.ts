import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation ThiefCrop($request: ThiefCropRequest!) {
        thiefCrop(request: $request) {
            quantity
        }
    }
`

export enum MutationThiefCrop {
    Mutation1 = "mutation1",
}

export interface ThiefCropRequest {
    placedItemTileId: string
}

export interface MutationThiefCropResponse {
    quantity: number
}

const mutationMap: Record<MutationThiefCrop, DocumentNode> = {
    [MutationThiefCrop.Mutation1]: mutation1,
}

export type MutationThiefCropParams = MutationParams<MutationThiefCrop, ThiefCropRequest>

export const mutationThiefCrop = async ({
    mutation = MutationThiefCrop.Mutation1,
    request
}: MutationThiefCropParams) => {
    if (!request) {
        throw new Error("Request is required for thief crop mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { thiefCrop: MutationThiefCropResponse },
        MutationVariables<ThiefCropRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 