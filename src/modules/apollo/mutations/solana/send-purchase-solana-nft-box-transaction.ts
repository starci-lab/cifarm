import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendPurchaseSolanaNFTBoxTransaction(
    $request: SendPurchaseSolanaNFTBoxTransactionRequest!
  ) {
    sendPurchaseSolanaNFTBoxTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendPurchaseSolanaNFTBoxTransaction {
  Mutation1 = "mutation1",
}

export interface SendPurchaseSolanaNFTBoxTransactionRequest {
  serializedTx: string;
}

export type SendPurchaseSolanaNFTBoxTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendPurchaseSolanaNFTBoxTransaction,
  DocumentNode
> = {
    [MutationSendPurchaseSolanaNFTBoxTransaction.Mutation1]: mutation1,
}

export type MutationSendPurchaseSolanaNFTBoxTransactionParams =
  MutationParams<
    MutationSendPurchaseSolanaNFTBoxTransaction,
    SendPurchaseSolanaNFTBoxTransactionRequest
  >;

export const mutationSendPurchaseSolanaNFTBoxTransaction = async ({
    mutation = MutationSendPurchaseSolanaNFTBoxTransaction.Mutation1,
    request,
}: MutationSendPurchaseSolanaNFTBoxTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send purchase solana nft starter box transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendPurchaseSolanaNFTBoxTransaction: SendPurchaseSolanaNFTBoxTransactionResponse;
    },
    MutationVariables<SendPurchaseSolanaNFTBoxTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
