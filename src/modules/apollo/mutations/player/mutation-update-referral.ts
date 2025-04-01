import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams, MutationVariables } from "../../types"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation UpdateReferral($request: UpdateReferralRequest!) {
    updateReferral(request: $request) {
        message
        success
      }
  }
`

export enum MutationUpdateReferral {
  Mutation1 = "mutation1",
}

export interface UpdateReferralRequest {
  referralUserId: string;
}

const mutationMap: Record<MutationUpdateReferral, DocumentNode> = {
    [MutationUpdateReferral.Mutation1]: mutation1,
}

export interface MutationUpdateReferralArgs {
  referralUserId: string;
}

export type MutationUpdateReferralParams = MutationParams<MutationUpdateReferral, MutationUpdateReferralArgs>

export const mutationUpdateReferral = async ({
    mutation = MutationUpdateReferral.Mutation1,
    request
}: MutationUpdateReferralParams) => {
    if (!request) {
        throw new Error("Request is required for update referral mutation")
    }
    
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
    { updateReferral: GraphQLResponse },
    MutationVariables<UpdateReferralRequest>
  >({
      mutation: mutationDocument,
      variables: { request }
  })
} 