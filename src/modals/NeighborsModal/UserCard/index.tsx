"use client"
import {
    NEIGHBORS_MODAL_DISCLOSURE,
    WARNING_MODAL_DISCLOSURE,
    EmitterEventName,
    useWs,
    WS,
} from "@/singleton"
import { pathConstants } from "@/constants"
import { gameState } from "@/game/config"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import {
    useRouterWithSearchParams,
} from "@/hooks"
import { addErrorToast, addSuccessToast } from "@/components"
import { UserSchema } from "@/types"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/singleton"
import {
    setWarningModalContent,
    setVisitedUser,
    useAppDispatch,
    setActiveNeighborCard,
    useAppSelector,
} from "@/redux"
import { HomeIcon } from "@heroicons/react/24/outline"
import { useDisclosure } from "react-use-disclosure"
import { usePathname } from "next/navigation"
import React, { FC, useState, useEffect } from "react"
import { ExtendedButton, Spacer } from "@/components"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { formatDistanceToNow } from "@/modules/common"
import { UserMinus, UserPlus } from "@phosphor-icons/react"

export interface UserCardProps {
  user: UserSchema;
  onFollowCallback?: () => void | Promise<void>;
  onUnfollowCallback?: () => void | Promise<void>;
  followed?: boolean;
}

const renderOnlineStatus = (user: UserSchema) => {
    if (user.isOnline) {
        return (
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-success rounded-full" />
                <div className="text-sm">Online</div>
            </div>
        )
    }
    if (!user.lastOnlineTime) {
        return (
            <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                <div className="text-sm">Offline</div>
            </div>
        )
    }
    return (
        <div className="flex gap-1 items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            <div className="text-sm">
        Offline {formatDistanceToNow(user.lastOnlineTime)} ago
            </div>
        </div>
    )
}

export const UserCard: FC<UserCardProps> = ({
    user,
    onFollowCallback,
    onUnfollowCallback,
    followed: baseFollowed,
}: UserCardProps) => {
    const [avatarUrl, setAvatarUrl] = useState("")

    const { close: closeNeighborsModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_MODAL_DISCLOSURE)

    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    const { open: openWarningModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(WARNING_MODAL_DISCLOSURE)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setAvatarUrl(user.avatarUrl ?? createJazziconBlobUrl(user.id))
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
                    <Spacer y={1} />
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
                            dispatch(
                                setWarningModalContent({
                                    message: "Are you sure you want to unfollow this user?",
                                    callback: async () => {
                                        try {
                                            await onUnfollowCallback?.()
                                            addSuccessToast({
                                                successMessage: "Unfollowed successfully",
                                            })
                                        } catch (error) {
                                            console.error(error)
                                            addErrorToast({
                                                errorMessage: "Failed to unfollow user",
                                            })
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
                        <UserMinus className="h-5 w-5" />
                    </ExtendedButton>
                ) : (
                    <ExtendedButton
                        onClick={async () => {
                            try {
                                await onFollowCallback?.()
                                addSuccessToast({
                                    successMessage: "Followed successfully",
                                })
                            } catch (error) {
                                console.error(error)
                                addErrorToast({
                                    errorMessage: "Failed to follow user",
                                })
                            }
                        }}
                        variant="ghost"
                        size="icon"
                    >
                        <UserPlus className="h-5 w-5" />
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
