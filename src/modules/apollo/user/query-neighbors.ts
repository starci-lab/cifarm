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
  query ($args: GetNeighborsArgs!) {
    neighbors(args: $args) {
      data {
        id
        level
        avatarUrl
        accountAddress
        followed
        username
      }
    }
  }
`

export interface QueryNeighborsResponse {
  neighbors: IPaginatedResponse<UserSchema>;
}

export enum QueryNeighbors {
  Query1 = "query1",
}

const queryMap: Record<QueryNeighbors, DocumentNode> = {
    [QueryNeighbors.Query1]: query1,
}

export type QueryNeighborsArgs = QueryManyArgs;
export type QueryNeighborsParams = QueryParams<QueryNeighbors, QueryNeighborsArgs>;
export const queryNeighbors = async ({
    query = QueryNeighbors.Query1,
    args = { limit: 5, offset: 0 },
}: QueryNeighborsParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryNeighborsResponse,
    QueryVariables<QueryNeighborsArgs>
  >({
      query: queryDocument,
      variables: {
          args,
      },
  })
}
