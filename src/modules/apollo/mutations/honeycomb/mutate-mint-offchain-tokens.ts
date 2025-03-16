import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationVariables } from "../../types"
import { TxResponse } from "@/modules/honeycomb"

const mutation1 = gql`
  mutation MintOffchainTokens($request: MintOffchainTokensRequest!) {
    mintOffchainTokens(request: $request) {
      hash
      success
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

export interface MutationMintOffchainTokensArgs {
  amount: number;
}

export interface MutationMintOffchainTokensParams {
  query?: MutationMintOffchainTokens;
  args?: MutationMintOffchainTokensArgs;
}

export const mutateMintOffchainTokens = async ({
    query = MutationMintOffchainTokens.Mutation1,
    args
}: MutationMintOffchainTokensParams) => {
    if (!args) {
        throw new Error("Args are required for mint offchain tokens mutation")
    }
    
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { mintOffchainTokens: TxResponse },
    MutationVariables<MintOffchainTokensRequest>
  >({
      mutation: mutationDocument,
      variables: { request: args }
  })
} 