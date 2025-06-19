import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation CreateSignedUrl($request: CreateSignedUrlRequest!) {
    createSignedUrl(request: $request) {
      message
      success
      data {
        signedUrl
      }
    }
  }
`

export enum MutationCreateSignedUrl {
  Mutation1 = "mutation1",
}

export interface MutationCreateSignedUrlRequest {
  key: string;
}

export interface MutationCreateSignedUrlResponse {
    signedUrl: string;
}

const mutationMap: Record<MutationCreateSignedUrl, DocumentNode> = {
    [MutationCreateSignedUrl.Mutation1]: mutation1,
}

export type MutationCreateSignedUrlParams = MutationParams<
  MutationCreateSignedUrl,
  MutationCreateSignedUrlRequest
>;

export const mutationCreateSignedUrl = async ({
    mutation = MutationCreateSignedUrl.Mutation1,
    request,
}: MutationCreateSignedUrlParams) => {
    if (!request) {
        throw new Error("Request is required for create signed url mutation")
    }
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { createSignedUrl: GraphQLResponse<MutationCreateSignedUrlResponse> },
    MutationVariables<MutationCreateSignedUrlRequest>
  >({
      mutation: mutationDocument,
      variables: { request },
  })
}
