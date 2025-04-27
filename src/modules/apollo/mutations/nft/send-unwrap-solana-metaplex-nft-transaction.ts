import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation SendUnwrapSolanaMetaplexNFTTransaction(
    $request: SendUnwrapSolanaMetaplexNFTTransactionRequest!
  ) {
    sendUnwrapSolanaMetaplexNFTTransaction(request: $request) {
      data {
        txHash
      }
      message
      success
    }
  }
`

export enum MutationSendUnwrapSolanaMetaplexNFTTransaction {
  Mutation1 = "mutation1",
}

export interface SendUnwrapSolanaMetaplexNFTTransactionRequest {
  serializedTx: string;
}

export type SendUnwrapSolanaMetaplexNFTTransactionResponse = GraphQLResponse<{
  txHash: string;
}>;

const mutationMap: Record<
  MutationSendUnwrapSolanaMetaplexNFTTransaction,
  DocumentNode
> = {
    [MutationSendUnwrapSolanaMetaplexNFTTransaction.Mutation1]: mutation1,
}

export type MutationSendUnwrapSolanaMetaplexNFTTransactionParams =
  MutationParams<
    MutationSendUnwrapSolanaMetaplexNFTTransaction,
    SendUnwrapSolanaMetaplexNFTTransactionRequest
  >;

export const mutationSendUnwrapSolanaMetaplexNFTTransaction = async ({
    mutation = MutationSendUnwrapSolanaMetaplexNFTTransaction.Mutation1,
    request,
}: MutationSendUnwrapSolanaMetaplexNFTTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send unwrap solana metaplex nft transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendUnwrapSolanaMetaplexNFTTransaction: SendUnwrapSolanaMetaplexNFTTransactionResponse;
    },
    MutationVariables<SendUnwrapSolanaMetaplexNFTTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
