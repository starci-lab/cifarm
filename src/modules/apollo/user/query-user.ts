import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../auth-client"
import { UserEntity } from "@/modules/entities"

export const query1 = gql`
  query {
    user {
      accountAddress
      chainKey
      dailyRewardLastClaimTime
      dailyRewardNumberOfClaim
      dailyRewardStreak
      energy
      energyFull
      energyRegenTime
      experiences
    }
  }
`

export enum QueryUser {
  Query1 = "query1",
}

export const queryMap: Record<QueryUser, DocumentNode> = {
    [QueryUser.Query1]: query1,
}

export const queryUser = async (query: QueryUser = QueryUser.Query1) => {
    const queryDocument = queryMap[query]
    return noCacheAuthClient.query<UserEntity>({
        query: queryDocument,
    })
}
