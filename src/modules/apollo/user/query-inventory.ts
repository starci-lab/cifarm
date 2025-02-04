import { InventoryEntity } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { authClient } from "../auth-client"

export const query1 = gql`
  query GetInventories($args: GetInventoriesArgs!) {
    inventories(args: $args) {
        data {
          id
        }
    }
  }
`

export enum QueryInventory {
  Query1 = "query1",
}

export const queryMap: Record<QueryInventory, DocumentNode> = {
    [QueryInventory.Query1]: query1,
}

export const queryInventory = async (
    query: QueryInventory = QueryInventory.Query1,
    limit: number = 50,
    offset: number = 0
) => {
    const queryDocument = queryMap[query]
    return authClient.query<Array<InventoryEntity>>({
        query: queryDocument,
        variables: {
            args: { limit, offset }
        },
    })
}
