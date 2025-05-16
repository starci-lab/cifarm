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
    NFTCollections,
    WholesaleMarket,
    GoldPurchases,
    InteractionPermissions,
    NFTBoxInfo,
    Tokens,
    TerrainSchema,
    PetInfo
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
      wholesaleMarketCapacity
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
      terrain
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
      harvestQuantity
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
      harvestQuantity
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
      harvestQuantity
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
      harvestQuantity
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
      price
      displayId
      placedItemTypeKey
      isNFT
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
      sellable
    }
    products {
      id
      displayId
      maxStack
      isQuality
      goldAmount
      type
      crop
      animal
      fruit
      flower
      building
      qualityVersionOf
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
    terrains {
      id
      displayId
      type
      availableInShop
      sellPrice
      sellable
      price
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
        day
        lastDay
      }
      day2 {
        golds
        day
        lastDay
      }
      day3 {
        golds
        day
        lastDay
      }
      day4 {
        golds
        day
        lastDay
      }
      day5 {
        golds
        day
        lastDay
      }
    }
    nftCollections {
      dragonFruit {
        solana {
          testnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          }
          mainnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          }
        }
      }
      jackfruit {
        solana {
          testnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          }
          mainnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          }
        }
      }
      rambutan {
        solana {
          testnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          } 
          mainnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          }
        }
      }
      pomegranate {
        solana {
          testnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          }
          mainnet {
            placedItemTypeId
            name
            collectionAddress
            imageUrl
          }
        }
      }
    } 
    wholesaleMarket {
      paymentKind
      price
      products {
        productId
        quantity
      }
    }
    goldPurchases {
      solana {
        testnet {
          options {
            price
            amount
            paymentKind
          }
        }
        mainnet {
          options {
            price
            amount
            paymentKind
          }
        }
      }
      sui {
        testnet {
          options {
            price
            amount
            paymentKind
          }
        }
        mainnet {
          options {
            price
            amount
            paymentKind
          }
        }
      }
    }
    interactionPermissions {
      thiefLevelGapThreshold
    }
    nftBoxInfo {
      boxPrice
      paymentKind
      feePercentage
      chances {
        nftType
        startChance
        endChance
        rareRarityChance
        epicRarityChance
      }
    }
    tokens {
      native {
        solana {
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
        sui {
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name  
          }
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
      }
      usdc {
        solana {
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
        sui {
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
      }
      usdt {
        solana {
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
        sui {
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
      }
      cifarm {
        solana {
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
        sui {
          testnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
          mainnet {
            tokenType
            tokenAddress
            decimals
            symbol
            imageUrl
            name
          }
        }
      }
    }
    petInfo {
      cat {
        chance
        percentQuantityBonus
        plusQuantity
      }
      dog {
        chance
        energyReduce
      }
    }
  }
`

export interface QueryStaticResponse {
  activities: Activities;
  defaultInfo: DefaultInfo;
  pets: Array<PetSchema>;
  petInfo: PetInfo;
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
  terrains: Array<TerrainSchema>
  animalInfo: AnimalInfo
  nftCollections: NFTCollections
  wholesaleMarket: WholesaleMarket
  goldPurchases: GoldPurchases
  interactionPermissions: InteractionPermissions
  nftBoxInfo: NFTBoxInfo
  tokens: Tokens
}

export const queryStatic = async () => {
    return noCacheAuthClient.query<QueryStaticResponse>({
        query,
    })
}
