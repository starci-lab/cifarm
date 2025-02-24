import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../auth-client"
import { UserSchema } from "@/modules/entities"
import { QueryParams } from "../types"

const query1 = gql`
  query {
    user {
      accountAddress
      chainKey
      dailyRewardLastClaimTime
      dailyRewardStreak
      energy
      energyFull
      tutorialStep
      energyRegenTime
      experiences
      golds
      tokens
      level
    }
  }
`

export interface QueryUserResponse {
    user: UserSchema
}


export enum QueryUser {
  Query1 = "query1",
}

const queryMap: Record<QueryUser, DocumentNode> = {
    [QueryUser.Query1]: query1,
}
export type QueryUserParams = QueryParams<QueryUser>;
export const queryUser = async ({ query = QueryUser.Query1 }: QueryUserParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<QueryUserResponse>({
        query: queryDocument,
    })
}
