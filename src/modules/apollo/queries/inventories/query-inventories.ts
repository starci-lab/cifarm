import { InventorySchema } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { IPaginatedResponse, QueryManyRequest, QueryParams } from "../../types"
import { QueryVariables } from "../../types"

const query1 = gql`
  query Inventories($request: GetInventoriesRequest!) {
    inventories(request: $request) {
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
export type QueryInventoriesArgs = QueryManyRequest;
export const queryInventories = async (
    {
        query = QueryInventories.Query1,
        request = { limit: 150 + 8 + 9, offset: 0 },
    }: QueryInventoriesParams
) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryInventoriesResponse,
    QueryVariables<QueryInventoriesArgs>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
