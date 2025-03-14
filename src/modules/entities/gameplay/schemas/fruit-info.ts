import { AbstractSchema } from "./abstract"
import { CropCurrentState } from "../enums"

export interface FruitInfoSchema extends AbstractSchema {
  currentStage: number;
  currentStageTimeElapsed: number;
  harvestQuantityRemaining: number;
  harvestCount: number;
  isQuality: boolean;
  currentState: CropCurrentState;
  thieves: Array<string>;
  fruit: string;
}
