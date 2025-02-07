import { Network, ChainKey } from "@/modules/blockchain"
import { InventoryEntity } from "./inventory"
import { PlacedItemEntity } from "./placed-item"
import { DeliveringProductEntity } from "./delivering-product"
import { UsersFollowingUsersEntity } from "./users-following-users"
import { SessionEntity } from "./session"
import { UuidAbstractEntity } from "./abstract"
import { TutorialStep } from "../enums"

export interface UserEntity extends UuidAbstractEntity {
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
    inventories?: Array<InventoryEntity>;
    placedItems?: Array<PlacedItemEntity>;
    deliveringProducts?: Array<DeliveringProductEntity>;
    followingUsers: Array<UsersFollowingUsersEntity>;
    followedByUsers: Array<UsersFollowingUsersEntity>;
    sessions?: Array<SessionEntity>;
}