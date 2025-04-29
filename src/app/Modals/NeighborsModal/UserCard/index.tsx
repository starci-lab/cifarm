"use client"
import {
    GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    NEIGHBORS_DISCLOSURE,
    WARNING_DISCLOSURE,
    WS,
} from "@/app/constants"
import { pathConstants } from "@/constants"
import { gameState } from "@/game/config"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import {
    useWs,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
    useRouterWithSearchParams,
    EmitterEventName,
} from "@/hooks"
import { blockchainMap } from "@/modules/blockchain"
import { UserSchema } from "@/modules/entities"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import { toastError, toastSuccess } from "@/modules/toast"
import { setWarningModal, setVisitedUser, useAppDispatch, setActiveNeighborCard, useAppSelector } from "@/redux"
import { HomeIcon } from "@heroicons/react/24/outline"
import { useDisclosure } from "react-use-disclosure"
import { UserMinus2, UserPlus2 } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { FC, useState, useEffect } from "react"
import { ExtendedButton, Spacer } from "@/components"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { formatDistanceToNow } from "@/modules/common"

export interface UserCardProps {
  user: UserSchema;
  onFollowCallback?: () => void | Promise<void>;
  onUnfollowCallback?: () => void | Promise<void>;
  followed?: boolean;
}

const renderOnlineStatus = (user: UserSchema) => {
    if (user.isOnline) {
        return <div className="flex gap-1 items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            <div className="text-sm">Online</div>
        </div>
    }
    if (!user.lastOnlineTime) {
        return <div className="flex gap-1 items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            <div className="text-sm">Offline</div>
        </div>
    }
    return <div className="flex gap-1 items-center">
        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
        <div className="text-sm">Offline {formatDistanceToNow(user.lastOnlineTime)} ago</div>
    </div>
}

export const UserCard: FC<UserCardProps> = ({
    user,
    onFollowCallback,
    onUnfollowCallback,
    followed: baseFollowed,
}: UserCardProps) => {
    const [avatarUrl, setAvatarUrl] = useState("")

    const { swrMutation: followSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationFollowSwrMutation>
  >(GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION)

    const { swrMutation: unfollowSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationUnfollowSwrMutation>
  >(GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION)

    const { close: closeNeighborsModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)

    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    const { open: openWarningModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WARNING_DISCLOSURE)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setAvatarUrl(user.avatarUrl ?? createJazziconBlobUrl(user.accountAddress))
    }, [user])
    const pathname = usePathname()
    const router = useRouterWithSearchParams()

    const neighborsTab = useAppSelector((state) => state.tabReducer.neighborsTab)

    return (
        <div className="p-3 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatarUrl} alt={user.username} />
                </Avatar>
                <div className="space-y-1">
                    <div className="font-medium">{user.username}</div>
                    <Spacer y={1}/>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Image
                                src={assetIconMap[AssetIconId.Experience].base.assetUrl}
                                alt="Experience"
                                className="w-5 h-5"
                            />
                            <div className="text-sm">{user.level}</div>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Image
                                src={blockchainMap[user.chainKey].imageUrl}
                                alt={blockchainMap[user.chainKey].name}
                                className="w-5 h-5"
                            />
                            <div className="text-sm">{blockchainMap[user.chainKey].name}</div>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Image
                                src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                alt="Gold"
                                className="w-5 h-5"
                            />
                            <div className="text-sm">{user.golds}</div>
                        </Badge>
                    </div>
                    <Spacer y={1}/>
                    {renderOnlineStatus(user)}
                </div>
            </div>
            <div className="flex gap-2">
                {baseFollowed || user.followed ? (
                    <ExtendedButton
                        onClick={() => {
                            dispatch(
                                setWarningModal({
                                    message: "Are you sure you want to unfollow this user?",
                                    callback: async () => {
                                        try {
                                            await unfollowSwrMutation.trigger({
                                                request: {
                                                    followeeUserId: user.id,
                                                },
                                            })
                                            await onUnfollowCallback?.()
                                            toastSuccess("Unfollowed successfully")
                                        } catch (error) {
                                            console.error(error)
                                            toastError("Failed to unfollow user")
                                        }
                                    },
                                })
                            )
                            openWarningModal()
                        }}
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                    >
                        <UserMinus2 className="h-5 w-5" />
                    </ExtendedButton>
                ) : (
                    <ExtendedButton
                        onClick={
                            async () => {
                                try {
                                    await followSwrMutation.trigger({
                                        request: {
                                            followeeUserId: user.id,
                                        },
                                    })
                                    await onFollowCallback?.()
                                    toastSuccess("Followed successfully")
                                } catch (error) {
                                    console.error(error)
                                    toastError("Failed to unfollow user")
                                }
                            }}
                        variant="ghost"
                        size="icon"
                    >
                        <UserPlus2 className="h-5 w-5" />
                    </ExtendedButton>
                )}
                <ExtendedButton
                    onClick={async () => {
                        closeNeighborsModal()
                        dispatch(setActiveNeighborCard(neighborsTab))
                        if (pathname !== pathConstants.play) {
                            router.push(pathConstants.play)
                            gameState.data = {
                                watchingUser: user,
                            }
                        } else {
                            if (!socket) {
                                throw new Error("Socket is not connected")
                            }
                            socket.emit(EmitterEventName.Visit, {
                                neighborUserId: user.id,
                            })
                            dispatch(setVisitedUser(user))
                            ExternalEventEmitter.emit(ExternalEventName.Visit, user)
                        }
                    }}
                    variant="ghost"
                    size="icon"
                >
                    <HomeIcon className="h-5 w-5" />
                </ExtendedButton>
            </div>
        </div>
    )
}
