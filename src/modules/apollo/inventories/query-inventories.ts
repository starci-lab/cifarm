import { InventoryEntity } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../auth-client"
import { IPaginatedResponse } from "../types"

const query1 = gql`
  query ($args: GetInventoriesArgs!) {
    inventories(args: $args) {
        data {
          id
          inventoryType {
            id
            maxStack
            deliverable
            animalId
            cropId
            availableIn
            asTool
            placeable
            productId
            supplyId
            tileId
            type
          }
          quantity
          isPlaced
          tokenId
        }
    }
  }
`

export enum QueryInventories {
  Query1 = "query1",
}

export interface QueryInventoriesResponse {
    inventories: IPaginatedResponse<InventoryEntity>
}

const queryMap: Record<QueryInventories, DocumentNode> = {
    [QueryInventories.Query1]: query1,
}

export const queryInventories = async (
    query: QueryInventories = QueryInventories.Query1,
    limit: number = 150,
    offset: number = 0
) => {
    const queryDocument = queryMap[query]
    return noCacheAuthClient.query<QueryInventoriesResponse>({
        query: queryDocument,
        variables: {
            args: { limit, offset }
        },
    })
}
