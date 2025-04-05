import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { TxResponses } from "@/modules/honeycomb"
import { Network } from "@/modules/blockchain"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
mutation WrapSolanaMetaplexNft($request: WrapSolanaMetaplexNFTRequest!) {
  wrapSolanaMetaplexNft(request: $request) {
    message
    success  
    data {
      lastValidBlockHeight
      transactions
      blockhash
    }
  }
}
`

export enum MutationWrapSolanaMetaplexNFT {
    Mutation1 = "mutation1",
}

export interface WrapSolanaMetaplexNFTRequest {
    network: Network
    nftAddress: string
}

export type WrapSolanaMetaplexNFTResponse = GraphQLResponse<TxResponses>

const mutationMap: Record<MutationWrapSolanaMetaplexNFT, DocumentNode> = {
    [MutationWrapSolanaMetaplexNFT.Mutation1]: mutation1,
}

export type MutationWrapSolanaMetaplexNFTParams = MutationParams<MutationWrapSolanaMetaplexNFT, WrapSolanaMetaplexNFTRequest>

export const mutationWrapSolanaMetaplexNft = async ({
    mutation = MutationWrapSolanaMetaplexNFT.Mutation1,
    request
}: MutationWrapSolanaMetaplexNFTParams) => {
    if (!request) {
        throw new Error("Request is required for wrap solana metaplex mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { wrapSolanaMetaplexNFT: WrapSolanaMetaplexNFTResponse },
        MutationVariables<WrapSolanaMetaplexNFTRequest>
    >({
        mutation: mutationDocument,
        variables: { request }
    })
} 