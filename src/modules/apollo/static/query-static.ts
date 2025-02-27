import { gql } from "@apollo/client"
import { client } from "../client"
import {
    Activities,
    AnimalSchema,
    AnimalRandomness,
    BuildingSchema,
    CropSchema,
    CropRandomness,
    EnergyRegen,
    InventoryTypeSchema,
    PlacedItemTypeSchema,
    SpinInfo,
    DefaultInfo,
    ToolSchema,
    ProductSchema,
    TileSchema,
    DailyRewardInfo,
    SupplySchema,
} from "@/modules/entities"

//long query for querying all the static data
const query = gql`
  {
    activities {
      water {
        experiencesGain
        energyConsume
      }
      feedAnimal {
        experiencesGain
        energyConsume
      }
      usePesticide {
        experiencesGain
        energyConsume
      }
      collectAnimalProduct {
        experiencesGain
        energyConsume
      }
      useFertilizer {
        experiencesGain
        energyConsume
      }
      useHerbicide {
        experiencesGain
        energyConsume
      }
      helpUseHerbicide {
        experiencesGain
        energyConsume
      }
      helpUsePesticide {
        experiencesGain
        energyConsume
      }
      helpWater {
        experiencesGain
        energyConsume
      }
      thiefCrop {
        experiencesGain
        energyConsume
      }
      thiefAnimalProduct {
        experiencesGain
        energyConsume
      }
      cureAnimal {
        experiencesGain
        energyConsume
      }
      helpCureAnimal {
        experiencesGain
        energyConsume
      }
      harvestCrop {
        experiencesGain
        energyConsume
      }
    }
    cropRandomness {
      thief3
      thief2
      needWater
      isWeedyOrInfested
    }
    animalRandomness {
      sickChance
      thief3
      thief2
    }
    defaultInfo {
      golds
      defaultCropId
      defaultSeedQuantity
      storageCapacity
      toolCapacity
      deliveryCapacity
    }
    spinInfo {
      appearanceChanceSlots {
        common {
          count
          thresholdMin
          thresholdMax
        }
        rare {
          count
          thresholdMin
          thresholdMax
        }
        uncommon {
          count
          thresholdMin
          thresholdMax
        }
        veryRare {
          count
          thresholdMin
          thresholdMax
        }
      }
    }
    energyRegen {
      time
    }
    placedItemTypes {
      id
      displayId
      type
      tile
      animal
      building
    }
    crops {
      id
      displayId
      growthStageDuration
      growthStages
      price
      unlockLevel
      premium
      perennialCount
      nextGrowthStageAfterHarvest
      minHarvestQuantity
      maxHarvestQuantity
      basicHarvestExperiences
      qualityHarvestExperiences
      availableInShop
    }
    animals {
      id
      displayId
      yieldTime
      unlockLevel
      offspringPrice
      price
      growthTime
      availableInShop
      hungerTime
      qualityProductChanceStack
      qualityProductChanceLimit
      minHarvestQuantity
      maxHarvestQuantity
      basicHarvestExperiences
      qualityHarvestExperiences
      type
    }
    buildings {
      id
      displayId
      availableInShop

      type
      maxUpgrade
      price
    }
    tiles {
      qualityProductChanceStack
      qualityProductChanceLimit
      price
      displayId
      placedItemTypeKey
      maxOwnership
      isNft
      availableInShop
    }
    tools {
      id
      displayId
      sort
      default
    }
    inventoryTypes {
      id
      displayId
      type
      availableIn
      placeable
      deliverable
      asTool
      maxStack
      crop
      supply
      product
      stackable
      tool
    }
    products {
      id
      displayId
      maxStack
      isQuality
      goldAmount
      tokenAmount
      type
      crop
      animal
    }
    supplies {
      displayId
      id
      fertilizerEffectTimeReduce
      availableInShop
      price
      type
    }
    dailyRewardInfo {
      day1 {
        golds
        tokens
        day
        lastDay
      }
      day2 {
        golds
        tokens
        day
        lastDay
      }
      day3 {
        golds
        tokens
        day
        lastDay
      }
      day4 {
        golds
        tokens
        day
        lastDay
      }
      day5 {
        golds
        tokens
        day
        lastDay
      }
    }
  }
`

export interface QueryStaticResponse {
  activities: Activities;
  cropRandomness: CropRandomness;
  animalRandomness: AnimalRandomness;
  defaultInfo: DefaultInfo;
  spinInfo: SpinInfo;
  energyRegen: EnergyRegen;
  placedItemTypes: Array<PlacedItemTypeSchema>;
  crops: Array<CropSchema>;
  animals: Array<AnimalSchema>;
  buildings: Array<BuildingSchema>;
  tiles: Array<TileSchema>;
  dailyRewardInfo: DailyRewardInfo;
  tools: Array<ToolSchema>;
  inventoryTypes: Array<InventoryTypeSchema>;
  products: Array<ProductSchema>
  supplies: Array<SupplySchema>
}

export const queryStatic = async () => {
    return client.query<QueryStaticResponse>({
        query,
    })
}
