import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
mutation CreateBuyGoldsSolanaTransaction($request: CreateBuyGoldsSolanaTransactionRequest!) {
  createBuyGoldsSolanaTransaction(request: $request) {
    message
    data {
      serializedTx
    }
    success
  }
}
`
export enum MutationCreateBuyGoldsSolanaTransaction {
  Mutation1 = "mutation1",
}

export type CreateBuyGoldsSolanaTransactionResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationCreateBuyGoldsSolanaTransaction, DocumentNode> = {
    [MutationCreateBuyGoldsSolanaTransaction.Mutation1]: mutation1,
}

export interface CreateBuyGoldsSolanaTransactionRequest {
  selectionIndex: number
}

export type MutationCreateBuyGoldsSolanaTransactionParams = MutationParams<
  MutationCreateBuyGoldsSolanaTransaction,
  CreateBuyGoldsSolanaTransactionRequest
>;

export const mutationCreateBuyGoldsSolanaTransaction = async ({
    mutation = MutationCreateBuyGoldsSolanaTransaction.Mutation1,
    request,
}: MutationCreateBuyGoldsSolanaTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for create buy golds solana transaction mutation"
        )
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createBuyGoldsSolanaTransaction: CreateBuyGoldsSolanaTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request,
      },
  })
}
