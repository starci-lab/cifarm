import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation ThiefFruit($request: ThiefFruitRequest!) {
        thiefFruit(request: $request) {
            quantity
        }
    }
`

export enum MutationThiefFruit {
    Mutation1 = "mutation1",
}

export interface ThiefFruitRequest {
    placedItemFruitId: string
}

export interface MutationThiefFruitResponse {
    quantity: number
}

const mutationMap: Record<MutationThiefFruit, DocumentNode> = {
    [MutationThiefFruit.Mutation1]: mutation1,
}

export type MutationThiefFruitParams = MutationParams<MutationThiefFruit, ThiefFruitRequest>

export const mutationThiefFruit = async ({
    mutation = MutationThiefFruit.Mutation1,
    request
}: MutationThiefFruitParams) => {
    if (!request) {
        throw new Error("Request is required for thief fruit mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { thiefFruit: MutationThiefFruitResponse },
        MutationVariables<ThiefFruitRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 