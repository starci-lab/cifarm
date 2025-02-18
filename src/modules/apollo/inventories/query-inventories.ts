import { InventorySchema } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../auth-client"
import { IPaginatedResponse, QueryManyArgs, QueryParams } from "../types"
import { QueryVariables } from "../types"

const query1 = gql`
  query ($args: GetInventoriesArgs!) {
    inventories(args: $args) {
      data {
        id
        inventoryType
        index
        quantity
        kind
      }
    }
  }
`

export enum QueryInventories {
  Query1 = "query1",
}

export interface QueryInventoriesResponse {
  inventories: IPaginatedResponse<InventorySchema>;
}

const queryMap: Record<QueryInventories, DocumentNode> = {
    [QueryInventories.Query1]: query1,
}

export type QueryInventoriesParams = QueryParams<QueryInventories, QueryInventoriesArgs>;
export type QueryInventoriesArgs = QueryManyArgs;
export const queryInventories = async (
    {
        query = QueryInventories.Query1,
        args = { limit: 150 + 8 + 9, offset: 0 },
    }: QueryInventoriesParams
) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryInventoriesResponse,
    QueryVariables<QueryInventoriesArgs>
  >({
      query: queryDocument,
      variables: {
          args,
      },
  })
}
