import { UserSchema } from "./user"

export interface UsersFollowingUsersSchema {
    followerId: string;
    followeeUserId: string;
    follower: UserSchema;
    followee: UserSchema;
}