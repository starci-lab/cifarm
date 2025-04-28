import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendWrapSolanaMetaplexNFTTransaction(
    $request: SendWrapSolanaMetaplexNFTTransactionRequest!
  ) {
    sendWrapSolanaMetaplexNFTTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendWrapSolanaMetaplexNFTTransaction {
  Mutation1 = "mutation1",
}

export interface SendWrapSolanaMetaplexNFTTransactionRequest {
  serializedTx: string;
}

export type SendWrapSolanaMetaplexNFTTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendWrapSolanaMetaplexNFTTransaction,
  DocumentNode
> = {
    [MutationSendWrapSolanaMetaplexNFTTransaction.Mutation1]: mutation1,
}

export type MutationSendWrapSolanaMetaplexNFTTransactionParams =
  MutationParams<
    MutationSendWrapSolanaMetaplexNFTTransaction,
    SendWrapSolanaMetaplexNFTTransactionRequest
  >;

export const mutationSendWrapSolanaMetaplexNFTTransaction = async ({
    mutation = MutationSendWrapSolanaMetaplexNFTTransaction.Mutation1,
    request,
}: MutationSendWrapSolanaMetaplexNFTTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send wrap solana metaplex nft transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendWrapSolanaMetaplexNFTTransaction: SendWrapSolanaMetaplexNFTTransactionResponse;
    },
    MutationVariables<SendWrapSolanaMetaplexNFTTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
