import { Network, ChainKey } from "@/modules/blockchain"
import { AbstractSchema } from "./abstract"
import { TutorialStep } from "../enums"

export interface UserSchema extends AbstractSchema {
    username: string;
    chainKey: ChainKey;
    network: Network;
    accountAddress: string;
    golds: number;
    tokens: number;
    experiences: number;
    tutorialStep: TutorialStep;
    energy: number;
    energyRegenTime: number;
    energyFull: boolean;
    avatarUrl?: string;
    level: number;
    stepIndex: number;
    dailyRewardStreak: number;
    dailyRewardLastClaimTime?: Date;
    dailyRewardNumberOfClaim: number;
    spinLastTime?: Date;
    spinCount: number;
    followed?: boolean;
}