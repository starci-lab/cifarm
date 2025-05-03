import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation PurchaseSolanaNFTBox {
  purchaseSolanaNFTBox {
    message
    success
    data {
      serializedTx
    }
  }
}
`

export enum MutationPurchaseSolanaNFTBox {
  Mutation1 = "mutation1",
}

export type PurchaseSolanaNFTBoxResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationPurchaseSolanaNFTBox, DocumentNode> = {
    [MutationPurchaseSolanaNFTBox.Mutation1]: mutation1,
}

export type MutationPurchaseSolanaNFTBoxParams = MutationParams<
  MutationPurchaseSolanaNFTBox
>;

export const mutationPurchaseSolanaNFTBox = async ({
    mutation = MutationPurchaseSolanaNFTBox.Mutation1,
    request,
}: MutationPurchaseSolanaNFTBoxParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { purchaseSolanaNFTBox: PurchaseSolanaNFTBoxResponse }
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
