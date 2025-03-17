import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationVariables } from "../../types"

const mutation1 = gql`
  mutation UpdateReferral($request: UpdateReferralRequest!) {
    updateReferral(request: $request)
  }
`

export enum MutationUpdateReferral {
  Mutation1 = "mutation1",
}

export interface UpdateReferralRequest {
  referralUserId: string;
}

export interface MutationUpdateReferralResponse {
  success: boolean;
}

const mutationMap: Record<MutationUpdateReferral, DocumentNode> = {
    [MutationUpdateReferral.Mutation1]: mutation1,
}

export interface MutationUpdateReferralArgs {
  referralUserId: string;
}

export interface MutationUpdateReferralParams {
  query?: MutationUpdateReferral;
  args?: MutationUpdateReferralArgs;
}

export const mutateUpdateReferral = async ({
    query = MutationUpdateReferral.Mutation1,
    args
}: MutationUpdateReferralParams) => {
    if (!args) {
        throw new Error("Request is required for update referral mutation")
    }
    
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { updateReferral: MutationUpdateReferralResponse },
    MutationVariables<UpdateReferralRequest>
  >({
      mutation: mutationDocument,
      variables: { request: args }
  })
} 