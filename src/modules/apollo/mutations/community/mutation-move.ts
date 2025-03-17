import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { Position } from "@/modules/entities"

const mutation1 = gql`
    mutation Move($request: MoveRequest!) {
        move(request: $request)
    }
`

export enum MutationMove {
    Mutation1 = "mutation1",
}

export interface MoveRequest {
    placedItemId: string
    position: Position
}

const mutationMap: Record<MutationMove, DocumentNode> = {
    [MutationMove.Mutation1]: mutation1,
}

export type MutationMoveParams = MutationParams<MutationMove, MoveRequest>

export const mutationMove = async ({
    mutation = MutationMove.Mutation1,
    request
}: MutationMoveParams) => {
    if (!request) {
        throw new Error("Request is required for move mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { move: null },
        MutationVariables<MoveRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 