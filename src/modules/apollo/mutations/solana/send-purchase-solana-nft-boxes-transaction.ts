import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"
import { NFTCollectionKey } from "@/types"
import { NFTRarityEnum } from "@/modules/blockchain"

const mutation1 = gql`
  mutation SendPurchaseSolanaNFTBoxesTransaction(
    $request: SendPurchaseSolanaNFTBoxesTransactionRequest!
  ) {
    sendPurchaseSolanaNFTBoxesTransaction(request: $request) {
      data {
        txHash
        nftBoxes {
          nftCollectionKey
          rarity
          nftName
          nftAddress
        }
      }
      message
      success
    }
  }
`

export enum MutationSendPurchaseSolanaNFTBoxesTransaction {
  Mutation1 = "mutation1",
}

export interface SendPurchaseSolanaNFTBoxesTransactionRequest {
  serializedTxs: Array<string>;
}

export interface NFTBox {
  nftCollectionKey: NFTCollectionKey
  rarity: NFTRarityEnum
  nftName: string
  nftAddress: string
}

export type SendPurchaseSolanaNFTBoxesTransactionResponse = GraphQLResponse<{
  txHash: string;
  nftBoxes: Array<NFTBox>
}>;

const mutationMap: Record<
  MutationSendPurchaseSolanaNFTBoxesTransaction,
  DocumentNode
> = {
    [MutationSendPurchaseSolanaNFTBoxesTransaction.Mutation1]: mutation1,
}

export type MutationSendPurchaseSolanaNFTBoxesTransactionParams =
  MutationParams<
    MutationSendPurchaseSolanaNFTBoxesTransaction,
    SendPurchaseSolanaNFTBoxesTransactionRequest
  >;

export const mutationSendPurchaseSolanaNFTBoxesTransaction = async ({
    mutation = MutationSendPurchaseSolanaNFTBoxesTransaction.Mutation1,
    request,
}: MutationSendPurchaseSolanaNFTBoxesTransactionParams) => {
    if (!request) {
        throw new Error(
            "Request is required for send purchase solana nft boxes transaction mutation"
        )
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    {
      sendPurchaseSolanaNFTBoxesTransaction: SendPurchaseSolanaNFTBoxesTransactionResponse;
    },
    MutationVariables<SendPurchaseSolanaNFTBoxesTransactionRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
