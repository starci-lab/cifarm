import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation ThiefPlant($request: ThiefPlantRequest!) {
        thiefPlant(request: $request) {
            quantity
        }
    }
`

export enum MutationThiefPlant {
    Mutation1 = "mutation1",
}

export interface ThiefPlantRequest {
    placedItemTileId: string
}

export interface MutationThiefPlantResponse {
    quantity: number
}

const mutationMap: Record<MutationThiefPlant, DocumentNode> = {
    [MutationThiefPlant.Mutation1]: mutation1,
}

export type MutationThiefPlantParams = MutationParams<MutationThiefPlant, ThiefPlantRequest>

export const mutationThiefPlant = async ({
    mutation = MutationThiefPlant.Mutation1,
    request
}: MutationThiefPlantParams) => {
    if (!request) {
        throw new Error("Request is required for thief plant mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { thiefPlant: MutationThiefPlantResponse },
        MutationVariables<ThiefPlantRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 