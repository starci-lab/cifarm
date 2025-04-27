import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation CreatePurchaseSolanaNFTStarterBoxTransaction {
  createPurchaseSolanaNFTStarterBoxTransaction {
    data {
      serializedTx
    }
    message
    success
  }
}
`

export enum MutationCreatePurchaseSolanaNFTStarterBoxTransaction {
  Mutation1 = "mutation1",
}

export type CreatePurchaseSolanaNFTStarterBoxTransactionResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationCreatePurchaseSolanaNFTStarterBoxTransaction, DocumentNode> = {
    [MutationCreatePurchaseSolanaNFTStarterBoxTransaction.Mutation1]: mutation1,
}

export type MutationCreatePurchaseSolanaNFTStarterBoxTransactionParams = MutationParams<
  MutationCreatePurchaseSolanaNFTStarterBoxTransaction
>;

export const mutationCreatePurchaseSolanaNFTStarterBoxTransaction = async ({
    mutation = MutationCreatePurchaseSolanaNFTStarterBoxTransaction.Mutation1,
}: MutationCreatePurchaseSolanaNFTStarterBoxTransactionParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createPurchaseSolanaNFTStarterBoxTransaction: CreatePurchaseSolanaNFTStarterBoxTransactionResponse }
  >({
      mutation: mutationDocument,
  })
}
