import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendPurchaseSolanaNFTStarterBoxTransaction(
    $request: SendPurchaseSolanaNFTStarterBoxTransactionRequest!
  ) {
    sendPurchaseSolanaNFTStarterBoxTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendPurchaseSolanaNFTStarterBoxTransaction {
  Mutation1 = "mutation1",
}

export interface SendPurchaseSolanaNFTStarterBoxTransactionRequest {
  serializedTx: string;
}

export type SendPurchaseSolanaNFTStarterBoxTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendPurchaseSolanaNFTStarterBoxTransaction,
  DocumentNode
> = {
    [MutationSendPurchaseSolanaNFTStarterBoxTransaction.Mutation1]: mutation1,
}

export type MutationSendPurchaseSolanaNFTStarterBoxTransactionParams =
  MutationParams<
    MutationSendPurchaseSolanaNFTStarterBoxTransaction,
    SendPurchaseSolanaNFTStarterBoxTransactionRequest
  >;

export const mutationSendPurchaseSolanaNFTStarterBoxTransaction = async ({
    mutation = MutationSendPurchaseSolanaNFTStarterBoxTransaction.Mutation1,
    request,
}: MutationSendPurchaseSolanaNFTStarterBoxTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send purchase solana nft starter box transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendPurchaseSolanaNFTStarterBoxTransaction: SendPurchaseSolanaNFTStarterBoxTransactionResponse;
    },
    MutationVariables<SendPurchaseSolanaNFTStarterBoxTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
