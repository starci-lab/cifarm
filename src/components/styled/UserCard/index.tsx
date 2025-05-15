"use client"
import { UserSchema } from "@/modules/entities"
import { createJazziconBlobUrl } from "@/modules/jazz"
import React, { FC, useState, useEffect } from "react"
import { ExtendedButton, Spacer } from "@/components"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { formatDistanceToNow } from "@/modules/common"
import { MapPinArea, UserMinus, UserPlus } from "@phosphor-icons/react"

export interface UserCardProps {
  user: UserSchema;
  followed?: boolean;
  onFollowClick?: () => void | Promise<void>;
  onUnfollowClick?: () => void | Promise<void>;
  onVisitClick?: () => void | Promise<void>;
}

const renderOnlineStatus = (user: UserSchema) => {
    if (user.isOnline) {
        return (
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-success rounded-full" />
                <div className="text-sm text-success">Online</div>
            </div>
        )
    }
    if (!user.lastOnlineTime) {
        return (
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                <div className="text-sm text-muted-foreground">Offline</div>
            </div>
        )
    }
    return (
        <div className="flex gap-1 items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            <div className="text-sm text-muted-foreground">
        Offline {formatDistanceToNow(user.lastOnlineTime)}
            </div>
        </div>
    )
}

export const UserCard: FC<UserCardProps> = ({
    user,
    followed: baseFollowed,
    onFollowClick,
    onUnfollowClick,
    onVisitClick,
}: UserCardProps) => {
    const [avatar, setAvatar] = useState(user.avatarUrl ?? createJazziconBlobUrl(user.id))

    useEffect(() => {
        if (user.avatarUrl) {
            setAvatar(user.avatarUrl)
        } else {
            setAvatar(createJazziconBlobUrl(user.id))
        }
    }, [user.id])

    return (
        <div className="p-3 flex justify-between items-center bg-content-2">
            <div className="flex gap-2 items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} alt={user.username} />
                </Avatar>
                <div className="space-y-1">
                    <div>{user.username}</div>
                    <Spacer y={1} />
                    <div className="flex flex-wrap gap-2">
                        <Badge className="flex items-center gap-1">
                            <Image
                                src={assetIconMap[AssetIconId.Experience].base.assetUrl}
                                alt="Experience"
                                className="w-5 h-5"
                            />
                            <div className="text-sm">{user.level}</div>
                        </Badge>
                        <Badge className="flex items-center gap-1">
                            <Image
                                src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                alt="Gold"
                                className="w-5 h-5"
                            />
                            <div className="text-sm">{user.golds}</div>
                        </Badge>
                    </div>
                    <Spacer y={1} />
                    {renderOnlineStatus(user)}
                </div>
            </div>
            <div className="flex gap-2">
                {baseFollowed || user.followed ? (
                    <ExtendedButton
                        onClick={() => {
                            onUnfollowClick?.()
                        }}
                        variant="flat"
                        color="secondary"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                    >
                        <UserMinus />
                    </ExtendedButton>
                ) : (
                    <ExtendedButton
                        variant="flat"
                        color="secondary"
                        onClick={() => {
                            onFollowClick?.()
                        }}
                        size="icon"
                    >
                        <UserPlus />
                    </ExtendedButton>
                )}
                <ExtendedButton
                    onClick={async () => {
                        onVisitClick?.()
                    }}
                    color="primary"
                    size="icon"
                >
                    <MapPinArea />
                </ExtendedButton>
            </div>
        </div>
    )
}
