import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationVariables } from "../../types"

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

export interface MutationDeliverProductArgs {
  inventoryId: string;
  quantity: number;
  index: number;
}

export interface MutationDeliverProductParams {
  query?: MutationDeliverProduct;
  args?: MutationDeliverProductArgs;
}

export const mutateDeliverProduct = async ({
    query = MutationDeliverProduct.Mutation1,
    args
}: MutationDeliverProductParams) => {
    if (!args) {
        throw new Error("Args are required for deliver product mutation")
    }
    
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { deliverProduct: void },
    MutationVariables<DeliverProductRequest>
  >({
      mutation: mutationDocument,
      variables: { request: args }
  })
} 