import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { FruitId, Position } from "@/modules/entities"

const mutation1 = gql`
    mutation BuyFruit($request: BuyFruitRequest!) {
        buyFruit(request: $request) {
            success
        }
    }
`

export enum MutationBuyFruit {
    Mutation1 = "mutation1",
}

export interface BuyFruitRequest {
    fruitId: FruitId
    position: Position
}

export interface MutationBuyFruitResponse {
    success: boolean
}

const mutationMap: Record<MutationBuyFruit, DocumentNode> = {
    [MutationBuyFruit.Mutation1]: mutation1,
}

export type MutationBuyFruitParams = MutationParams<MutationBuyFruit, BuyFruitRequest>

export const mutationBuyFruit = async ({
    mutation = MutationBuyFruit.Mutation1,
    request
}: MutationBuyFruitParams) => {
    if (!request) {
        throw new Error("Request is required for buy fruit mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { buyFruit: MutationBuyFruitResponse },
        MutationVariables<BuyFruitRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 