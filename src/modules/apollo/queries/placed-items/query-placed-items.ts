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
      plantInfo {
        currentPerennialCount
        crop
        currentStage
        currentState
        harvestQuantityRemaining
        isFertilized
        isQuality
        thieves
        currentStageTimeElapsed
        plantType
        flower
      }
      buildingInfo {
        currentUpgrade
      }
      beeHouseInfo {
        currentState
        currentYieldTime
        thieves
        harvestQuantityRemaining
        isQuality
        harvestQuantityDesired
      }
      animalInfo {
        currentGrowthTime
        currentHungryTime
        currentYieldTime
        currentState
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
  userId?: string;
}

export interface QueryPlacedItemsResponse {
  placedItems: Array<PlacedItemSchema>;
}

export const queryPlacedItems = async ({
    query = QueryPlacedItems.Query1,
    request = { },
}: QueryPlacedItemsParams) => {
    const queryDocument = queryMap[query]
    return await noCacheAuthClient.query<
    QueryPlacedItemsResponse,
    QueryVariables<QueryPlacedItemsRequest>
  >({
      query: queryDocument,
      variables: {
          request,
      },
  })
}
