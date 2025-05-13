import { DocumentNode, gql } from "@apollo/client"
import { noCacheClient } from "../../client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"
import { Network } from "@/modules/blockchain"

const mutation1 = gql`
  mutation AuthenticateGoogle($request: AuthenticateGoogleRequest!) {
    authenticateGoogle(request: $request) {
      success
      message
      data {
        accessToken
        refreshToken
        }
      }
  }
`

export enum MutationAuthenticateGoogle {
  Mutation1 = "mutation1",
}

export interface AuthenticateGoogleRequest {
  network: Network;
  //require token in params, but we will add it in the header
  token: string;
}

export interface AuthenticateGoogleResponse {
  accessToken: string;
  refreshToken: string;
  // we do not need refresh token here, since user can re-login anytime to retrive session
}

const mutationMap: Record<MutationAuthenticateGoogle, DocumentNode> = {
    [MutationAuthenticateGoogle.Mutation1]: mutation1,
}

export type MutationAuthenticateGoogleParams = MutationParams<MutationAuthenticateGoogle, AuthenticateGoogleRequest>;

export const mutationAuthenticateGoogle = async ({
    mutation = MutationAuthenticateGoogle.Mutation1,
    request
}: MutationAuthenticateGoogleParams) => {
    if (!request) {
        throw new Error("Request is required for authenticate google mutation")
    }

    const mutationDocument = mutationMap[mutation]
    return await noCacheClient.mutate<
    { authenticateGoogle: GraphQLResponse<AuthenticateGoogleResponse> },
    MutationVariables<AuthenticateGoogleRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
} 