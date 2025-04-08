import { FruitCurrentState } from "../enums"
import { AbstractSchema } from "./abstract"

export interface FruitInfoSchema extends AbstractSchema {
  currentStage: number;
  currentStageTimeElapsed: number;
  harvestQuantityRemaining: number;
  harvestCount: number;
  isQuality: boolean;
  currentState: FruitCurrentState;
  thieves: Array<string>;
  qualityYieldChance: string
  growthAcceleration: string
  harvestYieldBonus: number
  diseaseResistance: number
}
