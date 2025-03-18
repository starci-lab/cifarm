import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { SupplyId } from "@/modules/entities"

const mutation1 = gql`
    mutation BuySupplies($request: BuySuppliesRequest!) {
        buySupplies(request: $request)
    }
`

export enum MutationBuySupplies {
    Mutation1 = "mutation1",
}

export interface BuySuppliesRequest {
    supplyId: SupplyId
    quantity: number
}

const mutationMap: Record<MutationBuySupplies, DocumentNode> = {
    [MutationBuySupplies.Mutation1]: mutation1,
}

export type MutationBuySuppliesParams = MutationParams<MutationBuySupplies, BuySuppliesRequest>

export const mutationBuySupplies = async ({
    mutation = MutationBuySupplies.Mutation1,
    request
}: MutationBuySuppliesParams) => {
    if (!request) {
        throw new Error("Request is required for buy supplies mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { buySupplies: null },
        MutationVariables<BuySuppliesRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 