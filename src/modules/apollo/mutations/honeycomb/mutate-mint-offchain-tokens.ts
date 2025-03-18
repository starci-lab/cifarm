import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { TxResponse } from "@/modules/honeycomb"

const mutation1 = gql`
  mutation MintOffchainTokens($request: MintOffchainTokensRequest!) {
    mintOffchainTokens(request: $request) {
      transaction
      blockhash
      lastValidBlockHeight
    }
  }
`

export enum MutationMintOffchainTokens {
  Mutation1 = "mutation1",
}

export interface MintOffchainTokensRequest {
  amount: number;
}

const mutationMap: Record<MutationMintOffchainTokens, DocumentNode> = {
    [MutationMintOffchainTokens.Mutation1]: mutation1,
}

export interface MutationMintOffchainTokensRequest {
  amount: number;
}

export type MutationMintOffchainTokensParams = MutationParams<
  MutationMintOffchainTokens,
  MintOffchainTokensRequest
>;

export const mutateMintOffchainTokens = async ({
    mutation = MutationMintOffchainTokens.Mutation1,
    request,
}: MutationMintOffchainTokensParams) => {
    if (!request) {
        throw new Error("Request is required for mint offchain tokens mutation")
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { mintOffchainTokens: TxResponse },
    MutationVariables<MintOffchainTokensRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
