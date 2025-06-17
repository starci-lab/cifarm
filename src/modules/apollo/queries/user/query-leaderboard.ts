import { DocumentNode, gql } from "@apollo/client"
import { QueryParams } from "../../types"
import { client } from "../../client"
import { UserSchema } from "@/types"
import { Network } from "@/modules/blockchain"

const query1 = gql`
  query LeaderBoard($request: GetLeaderboardRequest!) {
  leaderboard(request: $request) {
    data {
      username
      level
      avatarUrl
    }
  }
}`

export interface QueryLeaderboardResponse {
  data: Array<UserSchema>
}

export interface QueryLeaderboardRequest {
  limit?: number
  network?: Network
}

export interface QueryLeaderboardResponseWrapper {
  leaderboard: QueryLeaderboardResponse
}

export enum QueryLeaderboard {
  Query1 = "query1",
}

const queryMap: Record<QueryLeaderboard, DocumentNode> = {
    [QueryLeaderboard.Query1]: query1,
}

export type QueryLeaderboardParams = QueryParams<QueryLeaderboard, QueryLeaderboardRequest>;
export const queryLeaderboard = async ({
    query = QueryLeaderboard.Query1, 
    request 
}: QueryLeaderboardParams) => {
    const queryDocument = queryMap[query]
    return await client.query<QueryLeaderboardResponseWrapper>({
        query: queryDocument,
        variables: {
            request,
        },
    })
}
