import { gql } from "@apollo/client"
import { noCacheAuthClient } from "../../auth-client"
import {
    Activities,
    AnimalSchema,
    BuildingSchema,
    CropSchema,
    EnergyRegen,
    InventoryTypeSchema,
    PlacedItemTypeSchema,
    DefaultInfo,
    ToolSchema,
    ProductSchema,
    TileSchema,
    DailyRewardInfo,
    SupplySchema,
    PetSchema,
    FruitSchema,
    AnimalInfo,
    CropInfo,
    FruitInfo,
    FlowerSchema,
    NFTCollections
} from "@/modules/entities"

//long query for querying all the static data
const query = gql`
  query Static {  
    activities {
      useWateringCan {
        experiencesGain
        energyConsume
      }
      useAnimalFeed {
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
      helpUseWateringCan {
        experiencesGain
        energyConsume
      }
      thiefPlant {
        experiencesGain
        energyConsume
      }
      thiefAnimal {
        experiencesGain
        energyConsume
      }
      useAnimalMedicine {
        experiencesGain
        energyConsume
      }
      helpUseAnimalMedicine {
        experiencesGain
        energyConsume
      }
      harvestPlant {
        energyConsume
      }
      helpUseFruitFertilizer {
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
      harvestBeeHouse {
        experiencesGain
        energyConsume
      }
      thiefBeeHouse {
        experiencesGain
        energyConsume
      }
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
      fruit
      pet
      sizeX
      sizeY
    }
    crops {
      id
      displayId
      growthStageDuration
      price
      unlockLevel
      perennialCount
      minHarvestQuantity
      maxHarvestQuantity
      basicHarvestExperiences
      qualityHarvestExperiences
      availableInShop
    }
    flowers {
      id
      displayId
      growthStageDuration
      price
      unlockLevel
      minHarvestQuantity
      maxHarvestQuantity
      basicHarvestExperiences
      qualityHarvestExperiences
      availableInShop
      honeyYieldCoefficient
      honeyQualityChancePlus
    }
    fruits {
      id
      displayId
      youngGrowthStageDuration
      matureGrowthStageDuration
      fertilizerTime
      price
      unlockLevel
      minHarvestQuantity
      maxHarvestQuantity
      basicHarvestExperiences
      qualityHarvestExperiences
      availableInShop
      sellable
      sellPrice
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
      sellable
      sellPrice
    }
    buildings {
      id
      displayId
      availableInShop
      unlockLevel
      maxOwnership
      animalContainedType
      maxUpgrade
      upgradeable
      beeHouseYieldTime
      beeHouseBasicHarvestExperiences
      beeHouseQualityHarvestExperiences
      baseHoneyYieldCoefficient
      price
      kind
      upgrades {
        id
        upgradePrice
        upgradeLevel
        capacity
      }
      sellable
      sellPrice
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
      sellable
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
      type
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
      flower
      building
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
    fruitInfo {
      randomness {
        thief3
        thief2
        isBuggy
      }
      nextGrowthStageAfterHarvest
      growthStages
      matureGrowthStage
    }
    cropInfo {
      randomness {
        thief3
        thief2
        needWater
        isWeedyOrInfested
      }
      nextGrowthStageAfterHarvest
      growthStages
    }
    animalInfo {
      randomness {
        sickChance
        thief3
        thief2
      }
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
    nftCollections {
      dragonFruit {
        solana {
          testnet {
            collectionAddress
          }
          mainnet {
            collectionAddress
          }
        }
      }
    }  
  }
`

export interface QueryStaticResponse {
  activities: Activities;
  defaultInfo: DefaultInfo;
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
  flowers: Array<FlowerSchema>
  fruits: Array<FruitSchema>
  fruitInfo: FruitInfo
  cropInfo: CropInfo
  animalInfo: AnimalInfo
  nftCollections: NFTCollections
}

export const queryStatic = async () => {
    return noCacheAuthClient.query<QueryStaticResponse>({
        query,
    })
}
