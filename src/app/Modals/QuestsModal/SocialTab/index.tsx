"use client"
import { ScrollShadow, Card, Divider, useDisclosure } from "@heroui/react"
import React, { FC } from "react"
import { QuestCard } from "../QuestCard"
import { GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION, INVITE_USER_DISCLOSURE, GRAPHQL_QUERY_STATIC_SWR, GRAPHQL_QUERY_USER_SWR, TOKEN_IMAGE_URL } from "@/app/constants"
import { useGraphQLMutationUpdateFollowXSwrMutation, useGraphQLQueryStaticSwr, useGraphQLQueryUserSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"

export const SocialTab: FC = () => {
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)
    const { swr: userSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryUserSwr>>(GRAPHQL_QUERY_USER_SWR)
    const { swrMutation: updateFollowXSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationUpdateFollowXSwrMutation>>(GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION)
    const { onOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(INVITE_USER_DISCLOSURE)
    return (
        <div className="relative">
            <ScrollShadow
                hideScrollBar
                className="h-[300px] relative -top-4 -left-4 p-4 w-[calc(100%+32px)]"
            >
                <Card>
                    <QuestCard
                        title="Follow X"
                        description="Follow our X account to earn rewards."
                        rewards={[
                            {
                                key: "follow-x-1",
                                imageUrl: TOKEN_IMAGE_URL,
                                amount: staticSwr.data?.data.defaultInfo.followXRewardQuantity ?? 0,
                            },
                        ]}
                        onPress={async () => {
                            window.open(
                                "https://x.com/intent/follow?screen_name=cifarmonsol",
                                "_blank"
                            )
                            await updateFollowXSwrMutation.trigger({})
                            await userSwr.mutate()
                        }
                        }
                        completed={userSwr.data?.data.user.followXAwarded}
                    />
                    <Divider />
                    <QuestCard
                        title="Invite User"
                        description="Invite new users to join CiFarm and earn rewards together."
                        rewards={[
                            {
                                key: "invite-user-1",
                                imageUrl: TOKEN_IMAGE_URL,
                                amount: staticSwr.data?.data.defaultInfo.referredRewardQuantity ?? 0,
                            },
                        ]}
                        progress={
                            {
                                current: userSwr.data?.data.user.referredUserIds.length ?? 0,
                                total: staticSwr.data?.data.defaultInfo.referredLimit ?? 0,
                                postText: "users referred",
                            }
                        }
                        onPress={() => {
                            onOpen()
                        }}
                        completed={(userSwr.data?.data.user.referredUserIds.length ?? 0) >= (staticSwr.data?.data.defaultInfo.referredLimit ?? 0)}
                    />
                </Card>
            </ScrollShadow>
        </div>
    )
}
