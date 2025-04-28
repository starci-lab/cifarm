import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendShipSolanaTransaction(
    $request: SendShipSolanaTransactionRequest!
  ) {
    sendShipSolanaTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendShipSolanaTransaction {
  Mutation1 = "mutation1",
}

export interface SendShipSolanaTransactionRequest {
  serializedTx: string;
}

export type SendShipSolanaTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendShipSolanaTransaction,
  DocumentNode
> = {
    [MutationSendShipSolanaTransaction.Mutation1]: mutation1,
}

export type MutationSendShipSolanaTransactionParams =
  MutationParams<
    MutationSendShipSolanaTransaction,
    SendShipSolanaTransactionRequest
  >;

export const mutationSendShipSolanaTransaction = async ({
    mutation = MutationSendShipSolanaTransaction.Mutation1,
    request,
}: MutationSendShipSolanaTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send ship solana transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendShipSolanaTransaction: SendShipSolanaTransactionResponse;
    },
    MutationVariables<SendShipSolanaTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
