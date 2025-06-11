import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxsResponse } from "../../types"
import { GraphQLResponse } from "../types"
import { NFTCollectionKey } from "@/modules/entities"

const mutation1 = gql`
  mutation CreateConvertSolanaMetaplexNFTsTransaction (
    $request: CreateConvertSolanaMetaplexNFTsTransactionRequest!
  ) {
  createConvertSolanaMetaplexNFTsTransaction (request: $request) {
    data {
      serializedTxs
    }
    message
    success
  }
}
`

export enum MutationCreateConvertSolanaMetaplexNFTsTransaction {
  Mutation1 = "mutation1",
}

export type CreateConvertSolanaMetaplexNFTsTransactionResponse = GraphQLResponse<UmiTxsResponse>;

const mutationMap: Record<MutationCreateConvertSolanaMetaplexNFTsTransaction, DocumentNode> = {
    [MutationCreateConvertSolanaMetaplexNFTsTransaction.Mutation1]: mutation1,
}

export interface CreateConvertSolanaMetaplexNFTsTransactionRequest {
  convertNFTAddresses: Array<string>
  accountAddress: string;
  nftCollectionKey: NFTCollectionKey;
  burnNFTCollectionKey: NFTCollectionKey;
}

export type MutationCreateConvertSolanaMetaplexNFTsTransactionParams = MutationParams<
  MutationCreateConvertSolanaMetaplexNFTsTransaction,
  CreateConvertSolanaMetaplexNFTsTransactionRequest
>;

export const mutationCreateConvertSolanaMetaplexNFTsTransaction = async ({
    mutation = MutationCreateConvertSolanaMetaplexNFTsTransaction.Mutation1,
    request,
}: MutationCreateConvertSolanaMetaplexNFTsTransactionParams) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createConvertSolanaMetaplexNFTsTransaction: CreateConvertSolanaMetaplexNFTsTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request,
      },
  })
}
