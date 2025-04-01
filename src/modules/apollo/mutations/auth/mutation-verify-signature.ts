import { DocumentNode, gql } from "@apollo/client"
import { noCacheClient } from "../../client"
import { MutationParams, MutationVariables } from "../../types"
import { ChainKey, Network } from "@/modules/blockchain"
import { GraphQLResponse } from "../types"
  
const mutation1 = gql`
  mutation VerifySignature(
    $request: VerifySignatureRequest!
  ) {
    verifySignature(request: $request) {
      message
      success
      data {
        accessToken
        refreshToken
        }
      }
  }
`

export enum MutationVerifySignature {
  Mutation1 = "mutation1",
}

export interface VerifySignatureRequest {
  message: string;
  publicKey: string;
  signature: string;
  chainKey?: ChainKey;
  network?: Network;
  accountAddress?: string;
  username: string;
}

export interface MutationVerifySignatureResponse {
  accessToken: string;
  refreshToken: string; 
}

const mutationMap: Record<MutationVerifySignature, DocumentNode> = {
    [MutationVerifySignature.Mutation1]: mutation1,
}

export interface MutationVerifySignatureRequest {
  message: string;
  publicKey: string;
  signature: string;
  chainKey?: ChainKey;
  network?: Network;
  accountAddress?: string;
  username: string;
}

export type MutationVerifySignatureParams = MutationParams<MutationVerifySignature, MutationVerifySignatureRequest>;

export const mutationVerifySignature = async ({
    mutation = MutationVerifySignature.Mutation1,
    request
}: MutationVerifySignatureParams) => {
    if (!request) {
        throw new Error("Request is required for verify signature mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await noCacheClient.mutate<
    { verifySignature: GraphQLResponse<MutationVerifySignatureResponse> },
    MutationVariables<VerifySignatureRequest>
  >({
      mutation: mutationDocument,
      variables: { request }
  })
} 