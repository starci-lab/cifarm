import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
    mutation DeliverMoreProduct($request: DeliverMoreProductRequest!) {
        deliverMoreProduct(request: $request)
    }
`

export enum MutationDeliverMoreProduct {
    Mutation1 = "mutation1",
}

export interface DeliverMoreProductRequest {
    inventoryId: string
    quantity: number
    index: number
}

const mutationMap: Record<MutationDeliverMoreProduct, DocumentNode> = {
    [MutationDeliverMoreProduct.Mutation1]: mutation1,
}

export type MutationDeliverMoreProductParams = MutationParams<MutationDeliverMoreProduct, DeliverMoreProductRequest>

export const mutationDeliverMoreProduct = async ({
    mutation = MutationDeliverMoreProduct.Mutation1,
    request
}: MutationDeliverMoreProductParams) => {
    if (!request) {
        throw new Error("Request is required for deliver more product mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { deliverMoreProduct: null },
        MutationVariables<DeliverMoreProductRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 