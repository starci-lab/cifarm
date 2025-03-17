import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation Sell($request: SellRequest!) {
        sell(request: $request) {
            quantity
        }
    }
`

export enum MutationSell {
    Mutation1 = "mutation1",
}

export interface SellRequest {
    placedItemId: string
}

export interface MutationSellResponse {
    quantity: number
}

const mutationMap: Record<MutationSell, DocumentNode> = {
    [MutationSell.Mutation1]: mutation1,
}

export type MutationSellParams = MutationParams<MutationSell, SellRequest>

export const mutationSell = async ({
    mutation = MutationSell.Mutation1,
    request
}: MutationSellParams) => {
    if (!request) {
        throw new Error("Request is required for sell mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { sell: MutationSellResponse },
        MutationVariables<SellRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 