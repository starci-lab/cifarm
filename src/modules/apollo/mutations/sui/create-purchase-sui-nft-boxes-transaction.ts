import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxsResponse } from "../../types"
import { GraphQLResponse } from "../types"
import { ChainKey } from "@/modules/blockchain"

const mutation1 = gql`
  mutation CreatePurchaseSuiNFTBoxesTransaction (
    $request: CreatePurchaseSuiNFTBoxesTransactionRequest!
  ) {
  createPurchaseSuiNFTBoxesTransaction (request: $request) {
    data {
      serializedTxs
    }
    message
    success
  }
}
`

export enum MutationCreatePurchaseSuiNFTBoxesTransaction {
  Mutation1 = "mutation1",
}

export type CreatePurchaseSuiNFTBoxesTransactionResponse = GraphQLResponse<UmiTxsResponse>;

const mutationMap: Record<MutationCreatePurchaseSuiNFTBoxesTransaction, DocumentNode> = {
    [MutationCreatePurchaseSuiNFTBoxesTransaction.Mutation1]: mutation1,
}

export interface CreatePurchaseSuiNFTBoxesTransactionRequest {
  accountAddress: string;
  quantity: number;
  chainKey?: ChainKey;
}

export type MutationCreatePurchaseSuiNFTBoxesTransactionParams = MutationParams<
  MutationCreatePurchaseSuiNFTBoxesTransaction,
  CreatePurchaseSuiNFTBoxesTransactionRequest
>;

export const mutationCreatePurchaseSuiNFTBoxesTransaction = async ({
    mutation = MutationCreatePurchaseSuiNFTBoxesTransaction.Mutation1,
    request,
}: MutationCreatePurchaseSuiNFTBoxesTransactionParams) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createPurchaseSuiNFTBoxesTransaction: CreatePurchaseSuiNFTBoxesTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request,
      },
  })
}
