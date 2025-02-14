import { Network, ChainKey } from "@/modules/blockchain"
import { InventorySchema } from "./inventory"
import { PlacedItemSchema } from "./placed-item"
import { DeliveringProductSchema } from "./delivering-product"
import { UsersFollowingUsersSchema } from "./users-following-users"
import { SessionSchema } from "./session"
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
    level: number;
    stepIndex: number;
    dailyRewardStreak: number;
    dailyRewardLastClaimTime?: Date;
    dailyRewardNumberOfClaim: number;
    spinLastTime?: Date;
    spinCount: number;
    inventories?: Array<InventorySchema>;
    placedItems?: Array<PlacedItemSchema>;
    deliveringProducts?: Array<DeliveringProductSchema>;
    followingUsers: Array<UsersFollowingUsersSchema>;
    followedByUsers: Array<UsersFollowingUsersSchema>;
    sessions?: Array<SessionSchema>;
}