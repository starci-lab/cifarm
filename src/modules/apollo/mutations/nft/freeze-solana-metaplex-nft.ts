import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables, UmiTxResponse } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation FreezeSolanaMetaplexNFT($request: FreezeSolanaMetaplexNFTRequest!) {
    freezeSolanaMetaplexNFT(request: $request) {
      message
      success
      data {
        serializedTx
      }
    }
  }
`

export enum MutationFreezeSolanaMetaplexNFT {
  Mutation1 = "mutation1",
}

export interface FreezeSolanaMetaplexNFTRequest {
  nftAddress: string;
  collectionAddress?: string;
}

export type FreezeSolanaMetaplexNFTResponse = GraphQLResponse<UmiTxResponse>;

const mutationMap: Record<MutationFreezeSolanaMetaplexNFT, DocumentNode> = {
    [MutationFreezeSolanaMetaplexNFT.Mutation1]: mutation1,
}

export type MutationFreezeSolanaMetaplexNFTParams = MutationParams<
  MutationFreezeSolanaMetaplexNFT,
  FreezeSolanaMetaplexNFTRequest
>;

export const mutationFreezeSolanaMetaplexNFT = async ({
    mutation = MutationFreezeSolanaMetaplexNFT.Mutation1,
    request,
}: MutationFreezeSolanaMetaplexNFTParams) => {
    if (!request) {
        throw new Error("Request is required for freeze solana metaplex mutation")
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { freezeSolanaMetaplexNFT: FreezeSolanaMetaplexNFTResponse },
    MutationVariables<FreezeSolanaMetaplexNFTRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
