"use client"
import React, { FC } from "react"
import { QuestCard } from "../QuestCard"
import {
    GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION,  
    GRAPHQL_QUERY_USER_SWR,
    REFERRAL_MODAL_DISCLOSURE,
} from "@/singleton"
import {
    useGraphQLMutationUpdateFollowXSwrMutation,
    useGraphQLQueryUserSwr,
} from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { List } from "@/components"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { useAppSelector } from "@/redux/hooks"

export enum SocialQuest {
    FollowX = "Follow X",
    InviteUser = "Invite User",
}

export const SocialTab: FC = () => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const user = useAppSelector((state) => state.apiReducer.coreApi.user)
    // user swr
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(GRAPHQL_QUERY_USER_SWR)
    // update follow x swr
    const { swrMutation: updateFollowXSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationUpdateFollowXSwrMutation>
  >(GRAPHQL_MUTATION_UPDATE_FOLLOW_X_SWR_MUTATION)
    // invite user modal
    const { open: openInviteUserModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        REFERRAL_MODAL_DISCLOSURE
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
                staticData?.defaultInfo.followXRewardQuantity ?? 0,
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
                    staticData?.defaultInfo.referredRewardQuantity ??
                    0,
                                },
                            ]}
                            progress={{
                                current: user?.referredUserIds.length ?? 0,
                                total: staticData?.defaultInfo.referredLimit ?? 0,
                                postText: "users referred",
                            }}
                            onClick={() => {
                                openInviteUserModal()
                            }}
                            completed={
                                (user?.referredUserIds.length ?? 0) >=
                (staticData?.defaultInfo.referredLimit ?? 0)
                            }
                        />
                    }
                    }
                }
            } />
        </div>
    )
}
