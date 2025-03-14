"use client"
import { PROFILE_DISCLOSURE, QUERY_USER_SWR } from "@/app/constants"
import { ExclamationTooltip } from "@/components"
import { pathConstants } from "@/constants"
import { useQueryUserSwr, useRouterWithSearchParams } from "@/hooks"
import { blockchainMap } from "@/modules/blockchain"
import { computeExperiencesQuota, truncateString } from "@/modules/common"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Avatar,
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Skeleton,
    Snippet,
    Spacer,
    useDisclosure,
    Image,
    Progress,
} from "@heroui/react"
import React, { FC } from "react"

export const ProfileModal: FC = () => {
    const { isOpen, onOpenChange, onClose } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(PROFILE_DISCLOSURE)
    const { swr } =
    useSingletonHook<ReturnType<typeof useQueryUserSwr>>(QUERY_USER_SWR)
    const user = swr.data?.data.user
    const avatarUrl = user
        ? user.avatarUrl ?? createJazziconBlobUrl(user.accountAddress)
        : ""
    const quota = user ? computeExperiencesQuota(user.level) : 0
    const router = useRouterWithSearchParams()
    return (
        <Modal
            disableAnimation={true}
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>
                    <div className="text-xl font-bold">Profile</div>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="flex gap-4 items-center">
                            <Avatar
                                isBordered
                                src={avatarUrl}
                                radius="full"
                                classNames={{
                                    base: "w-20 h-20 min-w-20",
                                }}
                            />
                            <div>
                                {user ? (
                                    <>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-xl font-bold">{user.username}</div>
                                            {user ? (
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
                                                            src={blockchainMap[user.chainKey].imageUrl}
                                                        />
                                                    }
                                                    variant="flat"
                                                    color="primary"
                                                >
                                                    {blockchainMap[user.chainKey].name}
                                                </Chip>
                                            ) : null}
                                        </div>
                                        <Spacer y={2} />
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm">{`UID: ${truncateString(
                                                user.id
                                            )}`}</div>
                                            <Snippet
                                                codeString={user.id}
                                                hideSymbol
                                                classNames={{
                                                    symbol: "text-foreground-400",
                                                    base: "p-0 gap-0 bg-transparent",
                                                }}
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm">{`Address: ${truncateString(
                                                user.accountAddress
                                            )}`}</div>
                                            <Snippet
                                                hideSymbol
                                                codeString={user.accountAddress}
                                                classNames={{
                                                    symbol: "text-foreground-400",
                                                    base: "p-0 gap-0 bg-transparent",
                                                }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Skeleton />
                                        <Skeleton />
                                    </>
                                )}
                            </div>
                        </div>
                        <Spacer y={4} />
                        <div>
                            {user ? (
                                <Progress
                                    label={`Lv.${user.level} (${user.experiences}/${quota})`}
                                    value={(user.experiences * 100) / quota}
                                />
                            ) : (
                                <Skeleton />
                            )}
                        </div>
                        <Spacer y={6} />
                        <div>
                            <div className="flex gap-2 items-center">
                                <div className="text-lg font-bold">Achievements</div>
                                <ExclamationTooltip message="Achievements and badges earned by the user." />
                            </div>
                            <Spacer y={4} />
              Currently, there are no achievements.
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onPress={() => {
                        onClose()
                        router.push(pathConstants.home)
                    }}>
            Quit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
