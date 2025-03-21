import { InventorySchema } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"
import { QueryVariables } from "../../types"

const query1 = gql`
  query Inventories {
    inventories {
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

export interface QueryInventoriesResponse {
  inventories: Array<InventorySchema>
}

export type QueryInventoriesParams = QueryParams<QueryInventories>;
export const queryInventories = async (
    {
        query = QueryInventories.Query1,
    }: QueryInventoriesParams
) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryInventoriesResponse,
    QueryVariables<never>
  >({
      query: queryDocument,
  })
}
