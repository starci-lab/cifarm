import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation ThiefAnimalProduct($request: ThiefAnimalProductRequest!) {
        thiefAnimalProduct(request: $request) {
            quantity
        }
    }
`

export enum MutationThiefAnimalProduct {
    Mutation1 = "mutation1",
}

export interface ThiefAnimalProductRequest {
    placedItemAnimalId: string
}

export interface MutationThiefAnimalProductResponse {
    quantity: number
}

const mutationMap: Record<MutationThiefAnimalProduct, DocumentNode> = {
    [MutationThiefAnimalProduct.Mutation1]: mutation1,
}

export type MutationThiefAnimalProductParams = MutationParams<MutationThiefAnimalProduct, ThiefAnimalProductRequest>

export const mutationThiefAnimalProduct = async ({
    mutation = MutationThiefAnimalProduct.Mutation1,
    request
}: MutationThiefAnimalProductParams) => {
    if (!request) {
        throw new Error("Request is required for thief animal product mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { thiefAnimalProduct: MutationThiefAnimalProductResponse },
        MutationVariables<ThiefAnimalProductRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 