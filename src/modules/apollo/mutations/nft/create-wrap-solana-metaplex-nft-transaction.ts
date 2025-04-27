import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation CreateWrapSolanaMetaplexNFTTransaction(
    $request: CreateWrapSolanaMetaplexNFTTransactionRequest!
  ) {
    createWrapSolanaMetaplexNFTTransaction(request: $request) {
      data {
        serializedTx
      }
      message
      success
    }
  }
`

export enum MutationCreateWrapSolanaMetaplexNFTTransaction {
  Mutation1 = "mutation1",
}

export type CreateWrapSolanaMetaplexNFTTransactionResponse =
  GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<
  MutationCreateWrapSolanaMetaplexNFTTransaction,
  DocumentNode
> = {
    [MutationCreateWrapSolanaMetaplexNFTTransaction.Mutation1]: mutation1,
}

export interface CreateWrapSolanaMetaplexNFTTransactionRequest {
  nftAddress: string;
  collectionAddress?: string;
}

export type MutationCreateWrapSolanaMetaplexNFTTransactionParams =
  MutationParams<
    MutationCreateWrapSolanaMetaplexNFTTransaction,
    CreateWrapSolanaMetaplexNFTTransactionRequest
  >;

export const mutationCreateWrapSolanaMetaplexNFTTransaction = async ({
    mutation = MutationCreateWrapSolanaMetaplexNFTTransaction.Mutation1,
    request,
}: MutationCreateWrapSolanaMetaplexNFTTransactionParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<{
    createWrapSolanaMetaplexNFTTransaction: CreateWrapSolanaMetaplexNFTTransactionResponse;
  }>({
      mutation: mutationDocument,
      variables: { request },
  })
}
