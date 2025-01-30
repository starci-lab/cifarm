import { Network, ChainKey } from "@/modules/blockchain"
import { InventoryEntity } from "./inventory"
import { PlacedItemEntity } from "./placed-item"
import { DeliveringProductEntity } from "./delivering-product"
import { UsersFollowingUsersEntity } from "./users-following-users"
import { SessionEntity } from "./session"

export interface UserEntity {
    username: string;
    chainKey: ChainKey;
    network: Network;
    accountAddress: string;
    golds: number;
    tokens: number;
    experiences: number;
    energy: number;
    energyRegenTime: number;
    energyFull: boolean;
    level: number;
    tutorialIndex: number;
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