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
      tileInfo {
        qualityYield
        growthAcceleration
        harvestYieldBonus
        diseaseResistance
        harvestCount
      }
      plantInfo {
        currentPerennialCount
        crop
        currentStage
        currentState
        harvestQuantityRemaining
        harvestQuantityDesired
        harvestQuantityMin
        isFertilized
        isQuality
        thieves
        currentStageTimeElapsed
        plantType
        flower
        harvestCount
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
        harvestQuantityMin
        growthAcceleration
        qualityYield
        diseaseResistance
        harvestYieldBonus
        harvestCount
      }
      animalInfo {
        currentGrowthTime
        currentHungryTime
        currentYieldTime
        currentState
        harvestQuantityRemaining
        harvestQuantityDesired
        harvestQuantityMin
        isAdult
        isQuality
        thieves
        growthAcceleration
        qualityYield
        diseaseResistance
        harvestYieldBonus
        harvestCount
      }
      fruitInfo {
        currentStage
        currentStageTimeElapsed
        currentState
        harvestQuantityRemaining
        harvestQuantityDesired
        harvestQuantityMin
        isQuality
        thieves
        qualityYield
        growthAcceleration
        harvestYieldBonus
        diseaseResistance
        harvestCount
      }
      nftMetadata {
        nftAddress
        collectionAddress
        nftName
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
