import { ChainKey, Network } from "@/modules/blockchain"
import { Position } from "../base"
import { CropId, DailyRewardId, NFTType } from "../enums"

export interface SystemSchema {
  value: object;
}

export interface ActivityInfo {
  experiencesGain?: number;
  energyConsume: number;
}

export interface Activities {
  useWateringCan: ActivityInfo;
  useAnimalFeed: ActivityInfo;
  plantSeed: ActivityInfo;
  harvestAnimal: ActivityInfo;
  usePesticide: ActivityInfo;
  useFertilizer: ActivityInfo;
  useHerbicide: ActivityInfo;
  helpUseHerbicide: ActivityInfo;
  helpUsePesticide: ActivityInfo;
  helpUseWateringCan: ActivityInfo;
  thiefPlant: ActivityInfo;
  thiefAnimal: ActivityInfo;
  useAnimalMedicine: ActivityInfo;
  helpUseAnimalMedicine: ActivityInfo;
  harvestPlant: ActivityInfo;
  helpFeedAnimal: ActivityInfo
  useFruitFertilizer: ActivityInfo
  useBugNet: ActivityInfo
  helpUseFruitFertilizer: ActivityInfo
  helpUseBugNet: ActivityInfo
  harvestFruit: ActivityInfo
  thiefFruit: ActivityInfo
  harvestBeeHouse: ActivityInfo
  thiefBeeHouse: ActivityInfo
}

export interface CropInfo {
  randomness: CropRandomness;
  nextGrowthStageAfterHarvest: number
  growthStages: number
}

export interface CropRandomness {
  thief3: number;
  thief2: number;
  needWater: number;
  isWeedyOrInfested: number;
}

export interface AnimalRandomness {
  sickChance: number;
  thief3: number;
  thief2: number;
}

export interface AnimalInfo {
  randomness: AnimalRandomness;
}

export interface FruitRandomness {
  thief3: number
  thief2: number
  isBuggy: number
}

export interface FruitInfo {
  randomness: FruitRandomness;
  nextGrowthStageAfterHarvest: number
  matureGrowthStage: number
  growthStages: number
}

export interface Positions {
  tiles: Array<Position>;
  home: Position;
}

export interface DefaultInfo {
  golds: number;
  positions: Positions;
  defaultCropId: CropId;
  defaultSeedQuantity: number;
  storageCapacity: number;
  toolCapacity: number;
  deliveryCapacity: number;
  followeeLimit: number;
  referredLimit: number;
  referralRewardQuantity: number;
  referredRewardQuantity: number;
  followXRewardQuantity: number;
  tileLimit: number;
  fruitLimit: number;
  buildingLimit: number;
}

export interface EnergyRegen {
  time: number; // In milliseconds
}

export interface DailyReward {
  golds: number;
  day: number;
  lastDay: boolean;
}

export interface DailyRewardInfo {
  [DailyRewardId.Day1]: DailyReward;
  [DailyRewardId.Day2]: DailyReward;
  [DailyRewardId.Day3]: DailyReward;
  [DailyRewardId.Day4]: DailyReward;
  [DailyRewardId.Day5]: DailyReward;
}

export interface NFTCollectionData {
  collectionAddress: string
}

export interface NFTCollectionWrapped {
  [Network.Testnet]: NFTCollectionData;
  [Network.Mainnet]: NFTCollectionData;
}

export interface NFTCollection {
  [ChainKey.Solana]: NFTCollectionWrapped;
}

export interface NFTCollections {
  [NFTType.DragonFruit]: NFTCollection;
  [NFTType.Jackfruit]: NFTCollection;
}

