import { Network, ChainKey } from "@/modules/blockchain"
import { AbstractSchema } from "./abstract"

export interface UserSchema extends AbstractSchema {
    username: string;
    chainKey: ChainKey;
    network: Network;
    accountAddress: string;
    golds: number;
    experiences: number;
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
    referralUserId?: string;
    referredUserIds: Array<string>;
    followXAwarded: boolean;
    sound: number
    ambient: number 
}