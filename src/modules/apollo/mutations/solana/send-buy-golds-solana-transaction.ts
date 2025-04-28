import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendBuyGoldsSolanaTransaction(
    $request: SendBuyGoldsSolanaTransactionRequest!
  ) {
    sendBuyGoldsSolanaTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendBuyGoldsSolanaTransaction {
  Mutation1 = "mutation1",
}

export interface SendBuyGoldsSolanaTransactionRequest {
  serializedTx: string;
}

export type SendBuyGoldsSolanaTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendBuyGoldsSolanaTransaction,
  DocumentNode
> = {
    [MutationSendBuyGoldsSolanaTransaction.Mutation1]: mutation1,
}

export type MutationSendBuyGoldsSolanaTransactionParams =
  MutationParams<
    MutationSendBuyGoldsSolanaTransaction,
    SendBuyGoldsSolanaTransactionRequest
  >;

export const mutationSendBuyGoldsSolanaTransaction = async ({
    mutation = MutationSendBuyGoldsSolanaTransaction.Mutation1,
    request,
}: MutationSendBuyGoldsSolanaTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send buy golds solana transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendBuyGoldsSolanaTransaction: SendBuyGoldsSolanaTransactionResponse;
    },
    MutationVariables<SendBuyGoldsSolanaTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
