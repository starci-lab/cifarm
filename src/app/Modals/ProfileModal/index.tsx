"use client"
import { PROFILE_DISCLOSURE, GRAPHQL_QUERY_USER_SWR  } from "@/app/constants"
import { ExclamationTooltip } from "@/components"
import { pathConstants } from "@/constants"
import { useDisclosure, useGraphQLQueryUserSwr, useRouterWithSearchParams } from "@/hooks"
import { blockchainMap } from "@/modules/blockchain"
import { computeExperiencesQuota, truncateString } from "@/modules/common"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export const ProfileModal: FC = () => {
    const { isOpen, onOpenChange, onClose } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(PROFILE_DISCLOSURE)
    const { swr } =
    useSingletonHook<ReturnType<typeof useGraphQLQueryUserSwr>>(GRAPHQL_QUERY_USER_SWR)
    const user = swr.data?.data.user
    const avatarUrl = user
        ? user.avatarUrl ?? createJazziconBlobUrl(user.accountAddress)
        : ""
    const quota = user ? computeExperiencesQuota(user.level) : 0
    const router = useRouterWithSearchParams()

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Profile</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div>
                        <div className="flex gap-4 items-center">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                                <Image
                                    src={avatarUrl}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                {user ? (
                                    <>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-xl font-bold">{user.username}</div>
                                            {user ? (
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <Image
                                                        src={blockchainMap[user.chainKey].imageUrl}
                                                        alt={blockchainMap[user.chainKey].name}
                                                        width={20}
                                                        height={20}
                                                        className="rounded-none"
                                                    />
                                                    {blockchainMap[user.chainKey].name}
                                                </Badge>
                                            ) : null}
                                        </div>
                                        <div className="h-2" /> {/* Spacer */}
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm">{`UID: ${truncateString(
                                                user.id
                                            )}`}</div>
                                            <code className="text-sm text-muted-foreground">{user.id}</code>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm">{`Address: ${truncateString(
                                                user.accountAddress
                                            )}`}</div>
                                            <code className="text-sm text-muted-foreground">{user.accountAddress}</code>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-4 w-24 mt-2" />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="h-4" /> {/* Spacer */}
                        <div>
                            {user ? (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Lv.{user.level}</span>
                                        <span>{user.experiences}/{quota}</span>
                                    </div>
                                    <Progress value={(user.experiences * 100) / quota} />
                                </div>
                            ) : (
                                <Skeleton className="h-4 w-full" />
                            )}
                        </div>
                        <div className="h-6" /> {/* Spacer */}
                        <div>
                            <div className="flex gap-2 items-center">
                                <div className="text-lg font-bold">Achievements</div>
                                <ExclamationTooltip message="Achievements and badges earned by the user." />
                            </div>
                            <div className="h-4" /> {/* Spacer */}
                            <div className="text-muted-foreground">
                                Currently, there are no achievements.
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        variant="destructive" 
                        onClick={() => {
                            onClose()
                            router.push(pathConstants.home)
                        }}
                    >
                        Quit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
