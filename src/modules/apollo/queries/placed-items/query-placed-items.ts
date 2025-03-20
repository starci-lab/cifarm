import { PlacedItemSchema } from "@/modules/entities"
import { DocumentNode, gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import { QueryParams } from "../../types"
import { QueryVariables } from "../../types"

const query1 = gql`
  query PlacedItems($request: PlacedItemsRequest!) {
    placedItems(request: $request) {
      id
      x
      y
      placedItemType
      seedGrowthInfo {
        currentPerennialCount
        crop
        currentStage
        currentState
        harvestQuantityRemaining
        isFertilized
        isQuality
        thieves
        currentStageTimeElapsed
      }
      buildingInfo {
        currentUpgrade
      }
      animalInfo {
        currentGrowthTime
        currentHungryTime
        currentYieldTime
        harvestQuantityRemaining
        isAdult
        isQuality
        thieves
      }
      fruitInfo {
        currentStage
        currentStageTimeElapsed
        currentState
        harvestQuantityRemaining
        isQuality
        thieves
      }
    }
  }
`

export enum QueryPlacedItems {
  Query1 = "query1",
}

const queryMap: Record<QueryPlacedItems, DocumentNode> = {
    [QueryPlacedItems.Query1]: query1,
}

export type QueryPlacedItemsParams = QueryParams<
  QueryPlacedItems,
  QueryPlacedItemsRequest
>;
export interface QueryPlacedItemsRequest {
  storeAsCache: boolean;
}
export const queryPlacedItems = async ({
    query = QueryPlacedItems.Query1,
    request = { storeAsCache: true },
}: QueryPlacedItemsParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    Array<PlacedItemSchema>,
    QueryVariables<QueryPlacedItemsRequest>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
