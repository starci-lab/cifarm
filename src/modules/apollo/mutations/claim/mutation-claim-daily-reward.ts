import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { MutationParams } from "../../types"

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

export type MutationClaimDailyRewardParams = MutationParams<MutationClaimDailyReward>

export const mutationClaimDailyReward = async ({
    mutation = MutationClaimDailyReward.Mutation1,
}: MutationClaimDailyRewardParams) => {
    const mutationDocument = mutationMap[mutation]
    return await authClient.mutate<
        { claimDailyReward: null }
    >({
        mutation: mutationDocument
    })
} 