import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
mutation CreateExpandLandLimitSolanaTransaction($request: CreateExpandLandLimitSolanaTransactionRequest!) {
  createExpandLandLimitSolanaTransaction(request: $request) {
    message
    data {
      serializedTx
    }
    success
  }
}
`
export enum MutationCreateExpandLandLimitSolanaTransaction {
  Mutation1 = "mutation1",
}

export type CreateExpandLandLimitSolanaTransactionResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationCreateExpandLandLimitSolanaTransaction, DocumentNode> = {
    [MutationCreateExpandLandLimitSolanaTransaction.Mutation1]: mutation1,
}

export interface CreateExpandLandLimitSolanaTransactionRequest {
  accountAddress: string
}

export type MutationCreateExpandLandLimitSolanaTransactionParams = MutationParams<
  MutationCreateExpandLandLimitSolanaTransaction,
  CreateExpandLandLimitSolanaTransactionRequest
>;

export const mutationCreateExpandLandLimitSolanaTransaction = async ({
    mutation = MutationCreateExpandLandLimitSolanaTransaction.Mutation1,
    request,
}: MutationCreateExpandLandLimitSolanaTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for create expand land limit solana transaction mutation"
        )
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createExpandLandLimitSolanaTransaction: CreateExpandLandLimitSolanaTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request,
      },
  })
}
