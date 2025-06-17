import { ChainKey, Network } from "@/modules/blockchain"
import { Position } from "../base"
import {
    CropId,
    DailyRewardId,
    NFTCollectionKey,
    TokenKey,
    TokenType,
} from "../enums"

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
  helpFeedAnimal: ActivityInfo;
  useFruitFertilizer: ActivityInfo;
  useBugNet: ActivityInfo;
  helpUseFruitFertilizer: ActivityInfo;
  helpUseBugNet: ActivityInfo;
  harvestFruit: ActivityInfo;
  thiefFruit: ActivityInfo;
  harvestBeeHouse: ActivityInfo;
  thiefBeeHouse: ActivityInfo;
}

export interface CropInfo {
  randomness: CropRandomness;
  nextGrowthStageAfterHarvest: number;
  growthStages: number;
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
  thief3: number;
  thief2: number;
  isBuggy: number;
}

export interface FruitInfo {
  randomness: FruitRandomness;
  nextGrowthStageAfterHarvest: number;
  matureGrowthStage: number;
  growthStages: number;
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
  wholesaleMarketCapacity: number;
  followeeLimit: number;
  referredLimit: number;
  referralRewardQuantity: number;
  referredRewardQuantity: number;
  followXRewardQuantity: number;
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
  placedItemTypeId: string;
  name: string;
  description: string;
  collectionAddress: string;
  imageUrl: string;
}
export type NFTCollection = Partial<Record<Network, NFTCollectionData>>;
export type NFTCollections = Partial<Record<NFTCollectionKey, NFTCollection>>;

export interface GoldPurchaseOption {
  price: number;
  amount: number;
  tokenKey: TokenKey;
}

export interface GoldPurchase {
  options: Array<GoldPurchaseOption>;
}
export type GoldPurchases = Record<Network, GoldPurchase>;

export interface EnergyPurchaseOption {
  price: number;
  percentage: number;
  tokenKey: TokenKey;
}
export interface EnergyPurchase {
  options: Array<EnergyPurchaseOption>;
}
export type EnergyPurchases = Record<Network, EnergyPurchase>;

export interface InteractionPermissions {
  thiefLevelGapThreshold: number;
}

export interface NFTBoxChance {
  nftCollectionKey: NFTCollectionKey;
  startChance: number;
  endChance: number;
  rareRarityChance: number;
  epicRarityChance: number;
}

export interface NFTBoxInfo {
  chances: Array<NFTBoxChance>;
  boxPrice: number;
  tokenKey: TokenKey;
  feePercentage: number;
}

export interface TokenData {
  name: string;
  tokenType: TokenType;
  tokenAddress?: string;
  decimals: number;
  imageUrl?: string;
  symbol: string;
}

export interface CatInfo {
  chance: number;
  percentQuantityBonus: number;
  plusQuantity: number;
}

export interface DogInfo {
  chance: number;
  energyReduce: number;
}

export interface PetInfo {
  cat: CatInfo;
  dog: DogInfo;
}

export interface Referral {
  amountPerSuccessfulReferral: number;
  amountWhenJoiningWithReferral: number;
  amountWhenYourReferralInviteSomeone: number;
}

export interface NFTConversion {
  conversionRate: number;
}
export type Token = Record<ChainKey, Partial<Record<Network, TokenData>>>;
export type Tokens = Partial<Record<TokenKey, Token>>;

export interface LandLimitInfo {
  landLimits: Array<LandLimit>
}

export interface BlockchainDataConfig {
  cacheDuration: number;
  refreshInterval: number;
}

export interface BlockchainDataConfigs {
  balances: BlockchainDataConfig;
  collections: BlockchainDataConfig;
}


export interface LandLimit {
  index: number
  price: number
  default: number
  tokenKey: TokenKey
  tileLimit: number
  fruitLimit: number
  buildingLimit: number
  sameBuildingLimit: number
}
