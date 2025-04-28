import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation PurchaseSolanaNFTStarterBox {
  purchaseSolanaNFTStarterBox {
    message
    success
    data {
      serializedTx
    }
  }
}
`

export enum MutationPurchaseSolanaNFTStarterBox {
  Mutation1 = "mutation1",
}

export type PurchaseSolanaNFTStarterBoxResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationPurchaseSolanaNFTStarterBox, DocumentNode> = {
    [MutationPurchaseSolanaNFTStarterBox.Mutation1]: mutation1,
}

export type MutationPurchaseSolanaNFTStarterBoxParams = MutationParams<
  MutationPurchaseSolanaNFTStarterBox
>;

export const mutationPurchaseSolanaNFTStarterBox = async ({
    mutation = MutationPurchaseSolanaNFTStarterBox.Mutation1,
    request,
}: MutationPurchaseSolanaNFTStarterBoxParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { purchaseSolanaNFTStarterBox: PurchaseSolanaNFTStarterBoxResponse }
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
