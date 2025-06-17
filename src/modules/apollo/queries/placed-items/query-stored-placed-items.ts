import { PlacedItemSchema } from "@/types"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { IPaginatedResponse, QueryManyRequest, QueryParams } from "../../types"
import { QueryVariables } from "../../types"

const query1 = gql`
  query StoredPlacedItems($request: StoredPlacedItemsRequest!) {
    storedPlacedItems(request: $request) {
      data {
        id
        x
        y
        placedItemType
        nftMetadata {
          nftAddress
          collectionAddress
          nftName
        }
      }
      count
    }
  }
`

export enum QueryStoredPlacedItems {
  Query1 = "query1",
}

const queryMap: Record<QueryStoredPlacedItems, DocumentNode> = {
    [QueryStoredPlacedItems.Query1]: query1,
}

export type QueryStoredPlacedItemsParams = QueryParams<
  QueryStoredPlacedItems,
  QueryStoredPlacedItemsRequest
>;

export interface QueryStoredPlacedItemsRequest extends QueryManyRequest {
  userId?: string;
}

export type QueryStoredPlacedItemsResponse = IPaginatedResponse<PlacedItemSchema>

export interface QueryStoredPlacedItemsResponseWrapper {
  storedPlacedItems: QueryStoredPlacedItemsResponse
}

export const queryStoredPlacedItems = async ({
    query = QueryStoredPlacedItems.Query1,
    request = { limit: 5, offset: 0 },
}: QueryStoredPlacedItemsParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryStoredPlacedItemsResponseWrapper,
    QueryVariables<QueryStoredPlacedItemsRequest>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
