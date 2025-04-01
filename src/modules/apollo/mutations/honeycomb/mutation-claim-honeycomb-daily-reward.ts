import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../../auth-client"
import { TxResponse } from "@/modules/honeycomb"
import { GraphQLResponse } from "../types"

const mutation1 = gql`
  mutation ClaimHoneycombDailyReward {
    claimHoneycombDailyReward {
      message
      success
      data {
        transaction
        blockhash
        lastValidBlockHeight
      }
    }
  }
`

export enum MutationClaimHoneycombDailyReward {
  Mutation1 = "mutation1",
}

const mutationMap: Record<MutationClaimHoneycombDailyReward, DocumentNode> = {
    [MutationClaimHoneycombDailyReward.Mutation1]: mutation1,
}

export interface MutationClaimHoneycombDailyRewardParams {
  query?: MutationClaimHoneycombDailyReward;
}

export const mutationClaimHoneycombDailyReward = async ({
    query = MutationClaimHoneycombDailyReward.Mutation1,
}: MutationClaimHoneycombDailyRewardParams = {}) => {
    const mutationDocument = mutationMap[query]
    return await authClient.mutate<
    { claimHoneycombDailyReward: GraphQLResponse<TxResponse> }
  >({
      mutation: mutationDocument
  })
} 