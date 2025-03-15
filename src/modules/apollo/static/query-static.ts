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
    PetSchema,
    FruitSchema,
} from "@/modules/entities"

//long query for querying all the static data
const query = gql`
  {
    activities {
      waterCrop {
        experiencesGain
        energyConsume
      }
      feedAnimal {
        experiencesGain
        energyConsume
      }
      plantSeed {
        experiencesGain
        energyConsume
      }
      usePesticide {
        experiencesGain
        energyConsume
      }
      harvestAnimal {
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
      helpFeedAnimal {
        experiencesGain
        energyConsume
      }
      useFruitFertilizer {
        experiencesGain
        energyConsume
      }
      useBugNet {
        experiencesGain
        energyConsume
      }
      helpUseFruitFertilizer {
        experiencesGain
        energyConsume
      }
      helpUseBugNet {
        experiencesGain
        energyConsume
      }
      harvestFruit {
        experiencesGain
        energyConsume
      }
      thiefFruit {
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
      followeeLimit
      referredLimit
      referralRewardQuantity
      referredRewardQuantity
      followXRewardQuantity
      tileLimit
      fruitLimit
      buildingLimit
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
      sellable
      type
      tile
      animal
      building
      fruit
      pet
      sizeX
      sizeY
    }
    crops {
      id
      displayId
      growthStageDuration
      growthStages
      price
      unlockLevel
      perennialCount
      nextGrowthStageAfterHarvest
      minHarvestQuantity
      maxHarvestQuantity
      basicHarvestExperiences
      qualityHarvestExperiences
      availableInShop
    }
    fruits {
      id
      displayId
      growthStageDuration
      growthStages
      price
      unlockLevel
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
      sellPrice
    }
    buildings {
      id
      displayId
      availableInShop
      unlockLevel
      maxOwnership
      type
      maxUpgrade
      price
      upgrades {
        id
        upgradePrice
        upgradeLevel
        capacity
        sellPrice
      }
    }
    tiles {
      displayId
      id
      qualityProductChanceStack
      qualityProductChanceLimit
      price
      displayId
      placedItemTypeKey
      isNft
      availableInShop
      sellPrice
    }
    tools {
      id
      displayId
      sort
      default
      givenAsDefault
      availableInShop
      price
      unlockLevel
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
    pets {
      id
      displayId
      availableInShop
      price
      unlockLevel
      sellPrice
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
      fruit
    }
    supplies {
      displayId
      id
      fertilizerEffectTimeReduce
      availableInShop
      price
      type
      unlockLevel
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
  pets: Array<PetSchema>;
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
  fruits: Array<FruitSchema>
}

export const queryStatic = async () => {
    return client.query<QueryStaticResponse>({
        query,
    })
}
