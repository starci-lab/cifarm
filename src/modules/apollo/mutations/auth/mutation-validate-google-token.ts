import { DocumentNode, gql } from "@apollo/client"
import { noCacheClient } from "../../client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation ValidateGoogleToken($request: ValidateGoogleTokenRequest!) {
    validateGoogleToken(request: $request) {
      success
      message
      data {
        accessToken
        refreshToken
        }
      }
  }
`

export enum MutationValidateGoogleToken {
  Mutation1 = "mutation1",
}

export interface ValidateGoogleTokenRequest {
  token: string;
}

export interface ValidateGoogleTokenResponse {
  accessToken: string;
  refreshToken: string;
  // we do not need refresh token here, since user can re-login anytime to retrive session
}

const mutationMap: Record<MutationValidateGoogleToken, DocumentNode> = {
    [MutationValidateGoogleToken.Mutation1]: mutation1,
}

export type MutationValidateGoogleTokenParams = MutationParams<MutationValidateGoogleToken, ValidateGoogleTokenRequest>;

export const mutationValidateGoogleToken = async ({
    mutation = MutationValidateGoogleToken.Mutation1,
    request
}: MutationValidateGoogleTokenParams) => {
    if (!request) {
        throw new Error("Request is required for validate google token mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await noCacheClient.mutate<
    { validateGoogleToken: GraphQLResponse<ValidateGoogleTokenResponse> },
    MutationVariables<ValidateGoogleTokenRequest>
  >({
      mutation: mutationDocument,
      variables: { request }
  })
} 