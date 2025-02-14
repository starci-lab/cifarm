import { gql } from "@apollo/client"
import { client } from "../client"
import {
    Activities,
    AnimalSchema,
    AnimalRandomness,
    BuildingSchema,
    CropSchema,
    CropRandomness,
    DailyRewardSchema,
    EnergyRegen,
    InventoryTypeSchema,
    PlacedItemTypeSchema,
    SpinInfo,
    DefaultInfo,
    ToolSchema,
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
      inventoryCapacity
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
      type
      tile
      animal
      building
    }
    crops {
      id
      growthStageDuration
      growthStages
      price
      premium
      perennialCount
      nextGrowthStageAfterHarvest
      minHarvestQuantity
      maxHarvestQuantity
      basicHarvestExperiences
      premiumHarvestExperiences
      availableInShop
    }
    animals {
      id
      yieldTime
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
      premiumHarvestExperiences
      type
    }
    buildings {
      id
      availableInShop
      type
      maxUpgrade
      price
    }
    tools {
      id
      availableIn
      index
    }
    inventoryTypes {
      id
      type
      availableIn
      placeable
      deliverable
      asTool
      maxStack
      crop
      supply
      product
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
  dailyRewards: Array<DailyRewardSchema>;
  tools: Array<ToolSchema>;
  inventoryTypes: Array<InventoryTypeSchema>;
}

export const queryStatic = async () => {
    return client.query<QueryStaticResponse>({
        query,
    })
}
