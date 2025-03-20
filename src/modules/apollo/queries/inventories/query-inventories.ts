import { InventorySchema } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"
import { QueryVariables } from "../../types"

const query1 = gql`
  query Inventories($request: InventoriesRequest!) {
    inventories(request: $request) {
      id
      inventoryType
      index
      quantity
      kind
    }
  }
`

export enum QueryInventories {
  Query1 = "query1",  
}

const queryMap: Record<QueryInventories, DocumentNode> = {
    [QueryInventories.Query1]: query1,
}

export type QueryInventoriesParams = QueryParams<QueryInventories, QueryInventoriesRequest>;
export interface QueryInventoriesRequest {
  storeAsCache: boolean
};
export const queryInventories = async (
    {
        query = QueryInventories.Query1,
        request = { storeAsCache: true },
    }: QueryInventoriesParams
) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    Array<InventorySchema>,
    QueryVariables<QueryInventoriesRequest>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
