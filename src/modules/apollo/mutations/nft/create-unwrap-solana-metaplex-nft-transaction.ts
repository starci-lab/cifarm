import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation CreateUnwrapSolanaMetaplexNFTTransaction(
    $request: CreateUnwrapSolanaMetaplexNFTTransactionRequest!
  ) {
    createUnwrapSolanaMetaplexNFTTransaction(request: $request) {
      data {
        serializedTx
      }
      message
      success
    }
  }
`

export enum MutationCreateUnwrapSolanaMetaplexNFTTransaction {
  Mutation1 = "mutation1",
}

export type CreateUnwrapSolanaMetaplexNFTTransactionResponse =
  GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<
  MutationCreateUnwrapSolanaMetaplexNFTTransaction,
  DocumentNode
> = {
    [MutationCreateUnwrapSolanaMetaplexNFTTransaction.Mutation1]: mutation1,
}

export interface CreateUnwrapSolanaMetaplexNFTTransactionRequest {
  nftAddress: string;
  collectionAddress?: string;
}

export type MutationCreateUnwrapSolanaMetaplexNFTTransactionParams =
  MutationParams<
    MutationCreateUnwrapSolanaMetaplexNFTTransaction,
    CreateUnwrapSolanaMetaplexNFTTransactionRequest
  >;

export const mutationCreateUnwrapSolanaMetaplexNFTTransaction = async ({
    mutation = MutationCreateUnwrapSolanaMetaplexNFTTransaction.Mutation1,
    request,
}: MutationCreateUnwrapSolanaMetaplexNFTTransactionParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<{
    createUnwrapSolanaMetaplexNFTTransaction: CreateUnwrapSolanaMetaplexNFTTransactionResponse;
  }>({
      mutation: mutationDocument,
      variables: { request },
  })
}
