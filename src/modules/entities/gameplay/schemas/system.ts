import { Position } from "../base"
import { AppearanceChance, CropId, DailyRewardId } from "../enums"

export interface SystemSchema {
  value: object;
}

export interface ActivityInfo {
  experiencesGain: number;
  energyConsume: number;
}

export interface Activities {
  water: ActivityInfo;
  feedAnimal: ActivityInfo;
  plantSeed: ActivityInfo;
  collectAnimalProduct: ActivityInfo;
  usePesticide: ActivityInfo;
  useFertilizer: ActivityInfo;
  useHerbicide: ActivityInfo;
  helpUseHerbicide: ActivityInfo;
  helpUsePesticide: ActivityInfo;
  helpWater: ActivityInfo;
  thiefCrop: ActivityInfo;
  thiefAnimalProduct: ActivityInfo;
  cureAnimal: ActivityInfo;
  helpCureAnimal: ActivityInfo;
  harvestCrop: ActivityInfo;
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
}

export interface SlotInfo {
  count: number;
  thresholdMin: number;
  thresholdMax: number;
}

export interface AppearanceChanceSlots {
  [AppearanceChance.Common]: SlotInfo;
  [AppearanceChance.Rare]: SlotInfo;
  [AppearanceChance.Uncommon]: SlotInfo;
  [AppearanceChance.VeryRare]: SlotInfo;
}

export interface SpinInfo {
  appearanceChanceSlots: AppearanceChanceSlots;
}

export interface EnergyRegen {
  time: number; // In milliseconds
}

export interface DailyReward {
  golds: number;
  tokens: number;
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
