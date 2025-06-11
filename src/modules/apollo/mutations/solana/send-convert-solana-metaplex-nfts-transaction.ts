import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"
import { GraphQLResponse } from "../types"
import { NFTCollectionKey } from "@/modules/entities"
import { NFTRarityEnum } from "@/modules/blockchain"

const mutation1 = gql`
  mutation SendConvertSolanaMetaplexNFTsTransaction (
    $request: SendConvertSolanaMetaplexNFTsTransactionRequest!
  ) {
  sendConvertSolanaMetaplexNFTsTransaction (request: $request) {
    data {
        txHash
        convertedNFTs {
        nftAddress
        nftName 
        nftCollectionKey
        rarity
      }
    }
    message
    success
  }
}
`

export enum MutationSendConvertSolanaMetaplexNFTsTransaction {
  Mutation1 = "mutation1",
}

export interface ConvertedNFT {
  nftAddress: string
  nftName: string
  nftCollectionKey: NFTCollectionKey
  rarity: NFTRarityEnum
}

export type SendConvertSolanaMetaplexNFTsTransactionResponse = GraphQLResponse<{
  txHash: string
  convertedNFTs: Array<ConvertedNFT>
}>;

const mutationMap: Record<MutationSendConvertSolanaMetaplexNFTsTransaction, DocumentNode> = {
    [MutationSendConvertSolanaMetaplexNFTsTransaction.Mutation1]: mutation1,
}

export interface SendConvertSolanaMetaplexNFTsTransactionRequest {
  serializedTxs: Array<string>;
}

export type MutationSendConvertSolanaMetaplexNFTsTransactionParams = MutationParams<
  MutationSendConvertSolanaMetaplexNFTsTransaction,
  SendConvertSolanaMetaplexNFTsTransactionRequest
>;

export const mutationSendConvertSolanaMetaplexNFTsTransaction = async ({
    mutation = MutationSendConvertSolanaMetaplexNFTsTransaction.Mutation1,
    request,
}: MutationSendConvertSolanaMetaplexNFTsTransactionParams) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { sendConvertSolanaMetaplexNFTsTransaction: SendConvertSolanaMetaplexNFTsTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request,
      },
  })
}
