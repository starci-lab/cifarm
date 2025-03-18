import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"

const mutation1 = gql`
  mutation RetainProduct($request: RetainProductRequest!) {
    retainProduct(request: $request)
  }
`

export enum MutationRetainProduct {
  Mutation1 = "mutation1",
}

export interface RetainProductRequest {
  inventoryId: string;
}

const mutationMap: Record<MutationRetainProduct, DocumentNode> = {
    [MutationRetainProduct.Mutation1]: mutation1,
}

export type MutationRetainProductParams = MutationParams<MutationRetainProduct, RetainProductRequest>      

export const mutationRetainProduct = async ({
    mutation = MutationRetainProduct.Mutation1,
    request
}: MutationRetainProductParams) => {
    if (!request) {
        throw new Error("Request is required for retain product mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { retainProduct: void },
    MutationVariables<RetainProductRequest>
  >({
      mutation: mutationDocument,
      variables: { request }
  })
} 