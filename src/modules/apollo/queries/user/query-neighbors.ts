import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { UserSchema } from "@/modules/entities"
import {
    IPaginatedResponse,
    QueryManyRequest,
    QueryParams,
    QueryVariables,
} from "../../types"
import { NeighborsSearchStatus } from "@/redux"

const query1 = gql`
  query Neighbors($request: NeighborsRequest!) {
    neighbors(request: $request) {
      data {
        id
        level
        avatarUrl
        username
        golds
        isOnline
        followed
        lastOnlineTime
      }
      count
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

export interface QueryNeighborsArgs extends QueryManyRequest {
   searchString?: string;
   levelStart?: number
   levelEnd?: number
   status?: NeighborsSearchStatus
   useAdvancedSearch?: boolean
}
export type QueryNeighborsParams = QueryParams<QueryNeighbors, QueryNeighborsArgs>;
export const queryNeighbors = async ({
    query = QueryNeighbors.Query1,
    request = { limit: 5, offset: 0 },
}: QueryNeighborsParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryNeighborsResponse,
    QueryVariables<QueryNeighborsArgs>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
