import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
mutation CreateBuyEnergySolanaTransaction($request: CreateBuyEnergySolanaTransactionRequest!) {
  createBuyEnergySolanaTransaction(request: $request) {
    message
    data {
      serializedTx
    }
    success
  }
}
`
export enum MutationCreateBuyEnergySolanaTransaction {
  Mutation1 = "mutation1",
}

export type CreateBuyEnergySolanaTransactionResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationCreateBuyEnergySolanaTransaction, DocumentNode> = {
    [MutationCreateBuyEnergySolanaTransaction.Mutation1]: mutation1,
}

export interface CreateBuyEnergySolanaTransactionRequest {
  selectionIndex: number
  accountAddress: string
}

export type MutationCreateBuyEnergySolanaTransactionParams = MutationParams<
  MutationCreateBuyEnergySolanaTransaction,
  CreateBuyEnergySolanaTransactionRequest
>;

export const mutationCreateBuyEnergySolanaTransaction = async ({
    mutation = MutationCreateBuyEnergySolanaTransaction.Mutation1,
    request,
}: MutationCreateBuyEnergySolanaTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for create buy energy solana transaction mutation"
        )
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createBuyEnergySolanaTransaction: CreateBuyEnergySolanaTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request,
      },
  })
}
