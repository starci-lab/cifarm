import { UserEntity } from "./user"

export interface UsersFollowingUsersEntity {
    followerId: string;
    followeeUserId: string;
    follower: UserEntity;
    followee: UserEntity;
}