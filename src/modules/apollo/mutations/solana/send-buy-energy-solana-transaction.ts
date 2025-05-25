import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendBuyEnergySolanaTransaction(
    $request: SendBuyEnergySolanaTransactionRequest!
  ) {
    sendBuyEnergySolanaTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendBuyEnergySolanaTransaction {
  Mutation1 = "mutation1",
}

export interface SendBuyEnergySolanaTransactionRequest {
  serializedTx: string;
}

export type SendBuyEnergySolanaTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendBuyEnergySolanaTransaction,
  DocumentNode
> = {
    [MutationSendBuyEnergySolanaTransaction.Mutation1]: mutation1,
}

export type MutationSendBuyEnergySolanaTransactionParams =
  MutationParams<
    MutationSendBuyEnergySolanaTransaction,
    SendBuyEnergySolanaTransactionRequest
  >;

export const mutationSendBuyEnergySolanaTransaction = async ({
    mutation = MutationSendBuyEnergySolanaTransaction.Mutation1,
    request,
}: MutationSendBuyEnergySolanaTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send buy energy solana transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendBuyEnergySolanaTransaction: SendBuyEnergySolanaTransactionResponse;
    },
    MutationVariables<SendBuyEnergySolanaTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
