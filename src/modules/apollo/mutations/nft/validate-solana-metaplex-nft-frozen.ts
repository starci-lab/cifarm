import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation ValidateSolanaMetaplexNFTFrozen($request: ValidateSolanaMetaplexNFTFrozenRequest!) {
  validateSolanaMetaplexNFTFrozen(request: $request) {
    message
    success
  }
}
`

export enum MutationValidateSolanaMetaplexNFTFrozen {
  Mutation1 = "mutation1",
}

export interface ValidateSolanaMetaplexNFTFrozenRequest {
  nftAddress: string;
}

export type ValidateSolanaMetaplexNFTFrozenResponse = GraphQLResponse;

const mutationMap: Record<MutationValidateSolanaMetaplexNFTFrozen, DocumentNode> = {
    [MutationValidateSolanaMetaplexNFTFrozen.Mutation1]: mutation1,
}

export type MutationValidateSolanaMetaplexNFTFrozenParams = MutationParams<
  MutationValidateSolanaMetaplexNFTFrozen,
  ValidateSolanaMetaplexNFTFrozenRequest
>;

export const mutationValidateSolanaMetaplexNFTFrozen = async ({
    mutation = MutationValidateSolanaMetaplexNFTFrozen.Mutation1,
    request,
}: MutationValidateSolanaMetaplexNFTFrozenParams) => {
    if (!request) {
        throw new Error("Request is required for validate solana metaplex nft frozen mutation")
    }

    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { validateSolanaMetaplexNFTFrozen: ValidateSolanaMetaplexNFTFrozenResponse },
    MutationVariables<ValidateSolanaMetaplexNFTFrozenRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
