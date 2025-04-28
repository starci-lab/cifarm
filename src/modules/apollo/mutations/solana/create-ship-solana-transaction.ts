import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation CreateShipSolanaTransaction {
  createShipSolanaTransaction {
    data {
      serializedTx
    }
    message
    success
  }
}
`

export enum MutationCreateShipSolanaTransaction {
  Mutation1 = "mutation1",
}

export type CreateShipSolanaTransactionResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationCreateShipSolanaTransaction, DocumentNode> = {
    [MutationCreateShipSolanaTransaction.Mutation1]: mutation1,
}

export type MutationCreateShipSolanaTransactionParams = MutationParams<
  MutationCreateShipSolanaTransaction
>;

export const mutationCreateShipSolanaTransaction = async ({
    mutation = MutationCreateShipSolanaTransaction.Mutation1,
}: MutationCreateShipSolanaTransactionParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createShipSolanaTransaction: CreateShipSolanaTransactionResponse }
  >({
      mutation: mutationDocument,
  })
}
