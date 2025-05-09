import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation CreateShipSolanaTransaction($request: CreateShipSolanaTransactionRequest!) {
  createShipSolanaTransaction(request: $request) {
    data {
      serializedTx
    }
    message
    success
  }
}
`

export enum MutationCreateShipSolanaTransaction {
  Mutation1 = "mutation1",
}

export type CreateShipSolanaTransactionResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationCreateShipSolanaTransaction, DocumentNode> = {
    [MutationCreateShipSolanaTransaction.Mutation1]: mutation1,
}

export interface CreateShipSolanaTransactionRequest {
  accountAddress: string
}

export type MutationCreateShipSolanaTransactionParams = MutationParams<
  MutationCreateShipSolanaTransaction,
  CreateShipSolanaTransactionRequest
>;

export const mutationCreateShipSolanaTransaction = async ({
    mutation = MutationCreateShipSolanaTransaction.Mutation1,
    request,
}: MutationCreateShipSolanaTransactionParams) => {
    if (!request) throw new Error("Request is required")
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createShipSolanaTransaction: CreateShipSolanaTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request
      }
  })
}
