"use client"
import {
    API_FOLLOW_SWR_MUTATION,
    API_UNFOLLOW_SWR_MUTATION,
    EXPERIENCE_IMAGE_URL,
    GOLD_IMAGE_URL,
    WARNING_DISCLOSURE,
} from "@/app/constants"
import { useApiFollowSwrMutation, useApiUnfollowSwrMutation } from "@/hooks"
import { blockchainMap } from "@/modules/blockchain"
import { UserSchema } from "@/modules/entities"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import { toastError, toastSuccess } from "@/modules/toast"
import { setWarningModal, useAppDispatch } from "@/redux"
import { HomeIcon } from "@heroicons/react/24/outline"
import { Avatar, Button, Chip, Image, Spacer, useDisclosure } from "@heroui/react"
import { UserMinus2, UserPlus2 } from "lucide-react"
import React, { FC } from "react"

export interface UserCardProps {
  user: UserSchema;
  onFollowCallback?: () => void | Promise<void>;
  onUnfollowCallback?: () => void | Promise<void>;
  followed?: boolean;
}
export const UserCard: FC<UserCardProps> = ({
    user: {
        avatarUrl,
        id,
        followed,
        accountAddress,
        username,
        level,
        golds,
        chainKey,
    },
    onFollowCallback,
    onUnfollowCallback,
    followed: baseFollowed,
}: UserCardProps) => {
    const { swrMutation: followSwrMutation } = useSingletonHook<
    ReturnType<typeof useApiFollowSwrMutation>
  >(API_FOLLOW_SWR_MUTATION)

    const { swrMutation: unfollowSwrMutation } = useSingletonHook<
    ReturnType<typeof useApiUnfollowSwrMutation>
  >(API_UNFOLLOW_SWR_MUTATION)

    const { onOpen: onWarningOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        WARNING_DISCLOSURE
    )
    const dispatch = useAppDispatch()

    avatarUrl = avatarUrl ?? createJazziconBlobUrl(accountAddress)
    return (
        <div className="p-3 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Avatar src={avatarUrl} className="min-w-10 w-10 h-10"/>
                <div>
                    <div>{username}</div>
                    <Spacer y={1}/>
                    <div className="flex flex-wrap gap-2">
                        <Chip
                            classNames={{
                                content: "pr-0",
                            }}
                            className="px-2 flex-1 sm:flex-none sm:w-1/2"
                            startContent={
                                <Image
                                    radius="none"
                                    className="w-5 h-5"
                                    removeWrapper
                                    src={EXPERIENCE_IMAGE_URL}
                                />
                            }
                            variant="flat"
                            color="primary"
                        >
                            {level}
                        </Chip>
                        <Chip
                            classNames={{
                                content: "pr-0",
                            }}
                            className="px-2 flex-1 sm:flex-none sm:w-1/2"
                            startContent={
                                <Image
                                    radius="none"
                                    className="w-5 h-5"
                                    removeWrapper
                                    src={blockchainMap[chainKey].imageUrl}
                                />
                            }
                            variant="flat"
                            color="primary"
                        >
                            {blockchainMap[chainKey].name}
                        </Chip>
                        <Chip
                            classNames={{
                                content: "pr-0",
                            }}
                            className="px-2 flex-1 sm:flex-none sm:w-1/2"
                            startContent={
                                <Image
                                    radius="none"
                                    className="w-5 h-5"
                                    removeWrapper
                                    src={GOLD_IMAGE_URL}
                                />
                            }
                            variant="flat"
                            color="primary"
                        >
                            {golds}
                        </Chip>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                {baseFollowed || followed ? (
                    <Button
                        onPress={() => {
                            dispatch(setWarningModal({
                                message: "Are you sure you want to unfollow this user?",
                                callback: async () => {
                                    try {
                                        await unfollowSwrMutation.trigger({
                                            request: {
                                                followeeUserId: id,
                                            },
                                        })
                                        await onUnfollowCallback?.()
                                        toastSuccess("Unfollowed successfully")
                                    } catch (error) {
                                        console.error(error)
                                        toastError("Failed to unfollow user")
                                    }
                                }
                            }))
                            onWarningOpen()
                        }
                        }
                        isIconOnly
                        variant="light"
                        color="danger"
                    >
                        <UserMinus2 className="w-5 h-5" strokeWidth={3 / 2} />
                    </Button>
                ) : (
                    <Button
                        onPress={async () => {
                            try {
                                await followSwrMutation.trigger({
                                    request: {
                                        followeeUserId: id,
                                    },
                                })
                                await onFollowCallback?.()
                                toastSuccess("Unfollowed successfully")
                            } catch (error) {
                                console.error(error)
                                toastError("Failed to unfollow user")
                            }
                        }
                        }
                        isIconOnly
                        variant="light"
                        color="primary"
                    >
                        <UserPlus2 className="w-5 h-5" strokeWidth={3 / 2} />
                    </Button>
                )}
                <Button isIconOnly color="primary">
                    <HomeIcon className="light text-background w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
