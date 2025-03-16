import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"

const mutation1 = gql`
  mutation ClaimDailyReward {
    claimDailyReward
  }
`

export enum MutationClaimDailyReward {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationClaimDailyReward, DocumentNode> = {
    [MutationClaimDailyReward.Mutation1]: mutation1,
}

export interface MutationClaimDailyRewardParams {
  query?: MutationClaimDailyReward;
}

export const mutateClaimDailyReward = async ({
    query = MutationClaimDailyReward.Mutation1,
}: MutationClaimDailyRewardParams = {}) => {
    const mutationDocument = mutationMap[query]
    return await authClient.mutate({
        mutation: mutationDocument
    })
} 