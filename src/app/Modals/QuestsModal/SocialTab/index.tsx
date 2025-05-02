"use client"
import React, { FC } from "react"
import { QuestCard } from "../QuestCard"
import {
    GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION,
    INVITE_USER_DISCLOSURE,
    GRAPHQL_QUERY_STATIC_SWR,
    GRAPHQL_QUERY_USER_SWR,
} from "@/app/constants"
import {
    useGraphQLMutationUpdateFollowXSwrMutation,
    useGraphQLQueryStaticSwr,
    useGraphQLQueryUserSwr,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { List } from "@/components"
import { AssetIconId, assetIconMap } from "@/modules/assets"
export enum SocialQuest {
    FollowX = "Follow X",
    InviteUser = "Invite User",
}

export const SocialTab: FC = () => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(GRAPHQL_QUERY_USER_SWR)
    const { swrMutation: updateFollowXSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationUpdateFollowXSwrMutation>
  >(GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION)
    const { open: openInviteUserModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        INVITE_USER_DISCLOSURE
    )

    return (
        <div>
            <List items={Object.values(SocialQuest)} contentCallback={
                (item) => {
                    switch (item) {
                    case SocialQuest.FollowX: {                      
                        return <QuestCard
                            title="Follow X"
                            description="Follow our X account to earn rewards."
                            rewards={[
                                {
                                    key: "follow-x-1",
                                    imageUrl: assetIconMap[AssetIconId.Gold].base.assetUrl,
                                    amount:
                staticSwr.data?.data.defaultInfo.followXRewardQuantity ?? 0,
                                },
                            ]}
                            onClick={async () => {
                                window.open(
                                    "https://x.com/intent/follow?screen_name=cifarmonsol",
                                    "_blank"
                                )
                                await updateFollowXSwrMutation.trigger({})
                                await userSwr.mutate()
                            }}
                            completed={userSwr.data?.data.user.followXAwarded}
                        />
                    }
                    case SocialQuest.InviteUser: {
                        return <QuestCard
                            title="Invite User"
                            description="Invite new users to join CiFarm and earn rewards together."
                            rewards={[
                                {
                                    key: "invite-user-1",
                                    imageUrl: assetIconMap[AssetIconId.Gold].base.assetUrl,
                                    amount:
                    staticSwr.data?.data.defaultInfo.referredRewardQuantity ??
                    0,
                                },
                            ]}
                            progress={{
                                current: userSwr.data?.data.user.referredUserIds.length ?? 0,
                                total: staticSwr.data?.data.defaultInfo.referredLimit ?? 0,
                                postText: "users referred",
                            }}
                            onClick={() => {
                                openInviteUserModal()
                            }}
                            completed={
                                (userSwr.data?.data.user.referredUserIds.length ?? 0) >=
                (staticSwr.data?.data.defaultInfo.referredLimit ?? 0)
                            }
                        />
                    }
                    }
                }
            } />
        </div>
    )
}
