import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation MoveInventory($request: MoveInventoryRequest!) {
        moveInventory(request: $request)
    }
`

export enum MutationMoveInventory {
    Mutation1 = "mutation1",
}

export interface MoveInventoryRequest {
    isTool: boolean
    index: number
    inventoryId: string
}

const mutationMap: Record<MutationMoveInventory, DocumentNode> = {
    [MutationMoveInventory.Mutation1]: mutation1,
}

export type MutationMoveInventoryParams = MutationParams<MutationMoveInventory, MoveInventoryRequest>

export const mutationMoveInventory = async ({
    mutation = MutationMoveInventory.Mutation1,
    request
}: MutationMoveInventoryParams) => {
    if (!request) {
        throw new Error("Request is required for move inventory mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { moveInventory: null },
        MutationVariables<MoveInventoryRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 