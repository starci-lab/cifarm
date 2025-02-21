import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../auth-client"
import { UserSchema } from "@/modules/entities"
import {
    IPaginatedResponse,
    QueryManyArgs,
    QueryParams,
    QueryVariables,
} from "../types"

const query1 = gql`
  query ($args: GetFolloweesArgs!) {
    followees(args: $args) {
      data {
        id
        avatarUrl
        username
      }
    }
  }
`

export interface QueryFolloweesResponse {
  neighbors: IPaginatedResponse<UserSchema>;
}

export enum QueryFollowees {
  Query1 = "query1",
}

const queryMap: Record<QueryFollowees, DocumentNode> = {
    [QueryFollowees.Query1]: query1,
}

export type QueryFolloweesArgs = QueryManyArgs;
export type QueryFolloweesParams = QueryParams<QueryFollowees, QueryFolloweesArgs>;
export const queryFollowees = async ({
    query = QueryFollowees.Query1,
    args = { limit: 5, offset: 0 },
}: QueryFolloweesParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryFolloweesResponse,
    QueryVariables<QueryFolloweesArgs>
  >({
      query: queryDocument,
      variables: {
          args,
      },
  })
}
