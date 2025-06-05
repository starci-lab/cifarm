import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"

const query1 = gql`
  query OccupiedPlacedItemCounts {
    occupiedPlacedItemCounts {
      tileCount
      buildingCount
      fruitCount
    }
  }
`

export enum QueryOccupiedPlacedItemCounts {
  Query1 = "query1",
}

const queryMap: Record<QueryOccupiedPlacedItemCounts, DocumentNode> = {
    [QueryOccupiedPlacedItemCounts.Query1]: query1,
}

export type QueryOccupiedPlacedItemCountsParams = QueryParams<
  QueryOccupiedPlacedItemCounts
>;

export interface QueryOccupiedPlacedItemCountsResponseWrapper {
  occupiedPlacedItemCounts: QueryOccupiedPlacedItemCountsResponse
}
export interface QueryOccupiedPlacedItemCountsResponse {
    tileCount: number;
    buildingCount: number;
    fruitCount: number;
}

export const queryOccupiedPlacedItemCounts = async ({
    query = QueryOccupiedPlacedItemCounts.Query1,
}: QueryOccupiedPlacedItemCountsParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<QueryOccupiedPlacedItemCountsResponseWrapper>({
        query: queryDocument,
    })
}
