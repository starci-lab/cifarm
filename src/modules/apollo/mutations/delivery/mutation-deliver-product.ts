import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
  mutation DeliverProduct($request: DeliverProductRequest!) {
    deliverProduct(request: $request)
  }
`

export enum MutationDeliverProduct {
  Mutation1 = "mutation1",
}

export interface DeliverProductRequest {
  inventoryId: string;
  quantity: number;
  index: number;
}

const mutationMap: Record<MutationDeliverProduct, DocumentNode> = {
    [MutationDeliverProduct.Mutation1]: mutation1,
}

export type MutationDeliverProductParams = MutationParams<MutationDeliverProduct, DeliverProductRequest>      

export const mutationDeliverProduct = async ({
    mutation = MutationDeliverProduct.Mutation1,
    request
}: MutationDeliverProductParams) => {
    if (!request) {
        throw new Error("Request is required for deliver product mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { deliverProduct: void },
    MutationVariables<DeliverProductRequest>
  >({
      mutation: mutationDocument,
      variables: { request }
  })
} 