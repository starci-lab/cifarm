import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxsResponse } from "../../types"
import { GraphQLResponse } from "../types"
import { ChainKey } from "@/modules/blockchain"

const mutation1 = gql`
  mutation CreatePurchaseSolanaNFTBoxesTransaction (
    $request: CreatePurchaseSolanaNFTBoxesTransactionRequest!
  ) {
  createPurchaseSolanaNFTBoxesTransaction (request: $request) {
    data {
      serializedTxs
    }
    message
    success
  }
}
`

export enum MutationCreatePurchaseSolanaNFTBoxesTransaction {
  Mutation1 = "mutation1",
}

export type CreatePurchaseSolanaNFTBoxesTransactionResponse = GraphQLResponse<UmiTxsResponse>;

const mutationMap: Record<MutationCreatePurchaseSolanaNFTBoxesTransaction, DocumentNode> = {
    [MutationCreatePurchaseSolanaNFTBoxesTransaction.Mutation1]: mutation1,
}

export interface CreatePurchaseSolanaNFTBoxesTransactionRequest {
  accountAddress: string;
  quantity: number;
  chainKey?: ChainKey;
}

export type MutationCreatePurchaseSolanaNFTBoxesTransactionParams = MutationParams<
  MutationCreatePurchaseSolanaNFTBoxesTransaction,
  CreatePurchaseSolanaNFTBoxesTransactionRequest
>;

export const mutationCreatePurchaseSolanaNFTBoxesTransaction = async ({
    mutation = MutationCreatePurchaseSolanaNFTBoxesTransaction.Mutation1,
    request,
}: MutationCreatePurchaseSolanaNFTBoxesTransactionParams) => {
    if (!request) {
        throw new Error("Request is required")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createPurchaseSolanaNFTBoxesTransaction: CreatePurchaseSolanaNFTBoxesTransactionResponse }
  >({
      mutation: mutationDocument,
      variables: {
          request,
      },
  })
}
