import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation CreatePurchaseSolanaNFTBoxTransaction {
  createPurchaseSolanaNFTBoxTransaction {
    data {
      serializedTx
    }
    message
    success
  }
}
`

export enum MutationCreatePurchaseSolanaNFTBoxTransaction {
  Mutation1 = "mutation1",
}

export type CreatePurchaseSolanaNFTBoxTransactionResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationCreatePurchaseSolanaNFTBoxTransaction, DocumentNode> = {
    [MutationCreatePurchaseSolanaNFTBoxTransaction.Mutation1]: mutation1,
}

export type MutationCreatePurchaseSolanaNFTBoxTransactionParams = MutationParams<
  MutationCreatePurchaseSolanaNFTBoxTransaction
>;

export const mutationCreatePurchaseSolanaNFTBoxTransaction = async ({
    mutation = MutationCreatePurchaseSolanaNFTBoxTransaction.Mutation1,
}: MutationCreatePurchaseSolanaNFTBoxTransactionParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createPurchaseSolanaNFTBoxTransaction: CreatePurchaseSolanaNFTBoxTransactionResponse }
  >({
      mutation: mutationDocument,
  })
}
