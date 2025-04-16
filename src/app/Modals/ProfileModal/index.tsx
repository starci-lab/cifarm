"use client"
import { PROFILE_DISCLOSURE, GRAPHQL_QUERY_USER_SWR  } from "@/app/constants"
import { ExclamationTooltip, GameAvatar, Image, ModalHeader, Snippet, Spacer } from "@/components"
import { pathConstants } from "@/constants"
import { useGraphQLQueryUserSwr, useRouterWithSearchParams } from "@/hooks"
import { blockchainMap } from "@/modules/blockchain"
import { computeExperiencesQuota, truncateString } from "@/modules/common"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { Button } from "@/components"
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
import { useDisclosure } from "react-use-disclosure"

export const ProfileModal: FC = () => {
    const { toggle, isOpen, close } =
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
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Profile" />
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div>
                        <div className="flex gap-4 items-center">
                            <GameAvatar
                                imgSrc={avatarUrl}
                                jazzString={user?.accountAddress}
                            />
                            <div>
                                {user ? (
                                    <>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-xl font-bold">{user.username}</div>
                                            {user ? (
                                                <Badge variant="secondary" className="flex gap-1">
                                                    <Image
                                                        src={blockchainMap[user.chainKey].imageUrl}
                                                        className="w-5 h-5"
                                                    />
                                                    {blockchainMap[user.chainKey].name}
                                                </Badge>
                                            ) : null}
                                        </div>
                                        <Spacer y={2} />
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm">{`UID: ${truncateString(
                                                user.id
                                            )}`}</div>
                                            <Snippet code={user.id} />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm">{`Address: ${truncateString(
                                                user.accountAddress
                                            )}`}</div>
                                            <Snippet code={user.accountAddress} />
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
                        <Spacer y={4} />
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
                        <Spacer y={6} />
                        <div>
                            <div className="flex gap-2 items-center">
                                <div className="text-lg font-bold">Achievements</div>
                                <ExclamationTooltip message="Achievements and badges earned by the user." />
                            </div>
                            <Spacer y={4} />
                            <div className="text-muted-foreground text-sm">
                                Currently, there are no achievements.
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        className="w-full" 
                        variant="destructive" 
                        onClick={() => {
                            close()
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
