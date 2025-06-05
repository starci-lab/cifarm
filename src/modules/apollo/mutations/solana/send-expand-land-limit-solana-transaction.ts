import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendExpandLandLimitSolanaTransaction(
    $request: SendExpandLandLimitSolanaTransactionRequest!
  ) {
    sendExpandLandLimitSolanaTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendExpandLandLimitSolanaTransaction {
  Mutation1 = "mutation1",
}

export interface SendExpandLandLimitSolanaTransactionRequest {
  serializedTx: string;
}

export type SendExpandLandLimitSolanaTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendExpandLandLimitSolanaTransaction,
  DocumentNode
> = {
    [MutationSendExpandLandLimitSolanaTransaction.Mutation1]: mutation1,
}

export type MutationSendExpandLandLimitSolanaTransactionParams =
  MutationParams<
    MutationSendExpandLandLimitSolanaTransaction,
    SendExpandLandLimitSolanaTransactionRequest
  >;

export const mutationSendExpandLandLimitSolanaTransaction = async ({
    mutation = MutationSendExpandLandLimitSolanaTransaction.Mutation1,
    request,
}: MutationSendExpandLandLimitSolanaTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send expand land limit solana transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
        sendExpandLandLimitSolanaTransaction: SendExpandLandLimitSolanaTransactionResponse;
    },
    MutationVariables<SendExpandLandLimitSolanaTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
