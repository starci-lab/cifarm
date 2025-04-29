"use client"
import {
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    QUERY_USER_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
} from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
    useGraphQLQueryUserSwr,
    useGraphQLQueryStaticSwr,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useEffect } from "react"
import { UserCard } from "../UserCard"
import { AdvancedSearchDropdown, FilterBar, List, Spacer } from "@/components"
import { RefreshCcw } from "lucide-react"
import { ExtendedButton, Pagination } from "@/components"
import { AdvancedSearchContent, getLevelRange } from "../AdvancedSearchContent"
import { useAppSelector } from "@/redux"
export const NeighborsTab: FC = () => {
    const {
        swr: { data, mutate: neighborsMutate },
        params,
        setParams,
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryNeighborsSwr>>(
        GRAPHQL_QUERY_NEIGHBORS_SWR
    )

    const {
        swr: { mutate: followeesMutate },
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryFolloweesSwr>>(
        GRAPHQL_QUERY_FOLLOWEES_SWR
    )

    const { swrMutation: followSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationFollowSwrMutation>
  >(GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION)

    const { swrMutation: unfollowSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationUnfollowSwrMutation>
  >(GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION)

    const neighbors = data?.data.neighbors.data || []
    const count = data?.data.neighbors.count || 0
    // compute the total number of pages
    const limit = params?.request?.limit ?? DEFAULT_LIMIT
    const offset = params?.request?.offset ?? DEFAULT_OFFSET
    const totalPage = Math.max(Math.ceil(count / limit), 1)
    const currentPage = Math.ceil(offset / limit) + 1

    const appliedLevelRange = useAppSelector(
        (state) => state.searchReducer.neighborsSearch.appliedLevelRange
    )
    const appliedStatus = useAppSelector(
        (state) => state.searchReducer.neighborsSearch.appliedStatus
    )

    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(QUERY_USER_SWR_MUTATION)

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    useEffect(() => {
        if (!userSwr.data?.data.user.level) return
        if (!staticSwr.data?.data.interactionPermissions.thiefLevelGapThreshold)
            return
        if (!setParams) throw new Error("setParams is not defined")
        const { levelStart, levelEnd } = getLevelRange({
            levelRange: appliedLevelRange,
            startLevel:
        staticSwr.data.data.interactionPermissions.thiefLevelGapThreshold,
            yourLevel: userSwr.data.data.user.level,
        })
        setParams({
            ...params,
            request: {
                ...params?.request,
                levelStart,
                levelEnd,
                status: appliedStatus,
            },
        })
    }, [
        appliedLevelRange,
        appliedStatus,
        userSwr.data?.data.user.level,
        staticSwr.data?.data.interactionPermissions.thiefLevelGapThreshold,
    ])

    const setPage = (page: number) => {
        if (!setParams) throw new Error("setParams is not defined")
        setParams({
            ...params,
            request: {
                ...params?.request,
                offset: (page - 1) * limit,
            },
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2 w-full">
                <FilterBar
                    placeholder="Username, address, ..."
                    handleSearchResult={({ searchString }) => {
                        if (!setParams) throw new Error("setParams is not defined")
                        if (!userSwr.data?.data.user.level)
                            throw new Error("user level is not defined")
                        if (
                            !staticSwr.data?.data.interactionPermissions
                                .thiefLevelGapThreshold
                        )
                            throw new Error("thief level gap threshold is not defined")
                        const { levelStart, levelEnd } = getLevelRange({
                            levelRange: appliedLevelRange,
                            startLevel:
                staticSwr.data.data.interactionPermissions
                    .thiefLevelGapThreshold,
                            yourLevel: userSwr.data.data.user.level,
                        })
                        setParams({
                            ...params,
                            request: {
                                ...params?.request,
                                searchString,
                                levelStart,
                                levelEnd,
                                status: appliedStatus,
                            },
                        })
                    }}
                    className="flex-1"
                />
                <div className="flex items-center gap-2">
                    <AdvancedSearchDropdown>
                        <AdvancedSearchContent />
                    </AdvancedSearchDropdown>
                    <ExtendedButton
                        variant="ghost"
                        size="icon"
                        onClick={() => neighborsMutate()}
                        className="shrink-0"
                    >
                        <RefreshCcw className="h-4 w-4" />
                    </ExtendedButton>
                </div>
            </div>
            <List
                items={neighbors}
                contentCallback={(item) => {
                    return (
                        <UserCard
                            user={item}
                            onFollowCallback={async () => {
                                await followSwrMutation.trigger({
                                    request: {
                                        followeeUserId: item.id,
                                    },
                                })

                                await neighborsMutate()
                                await followeesMutate()
                            }}
                            onUnfollowCallback={async () => {
                                await unfollowSwrMutation.trigger({
                                    request: {
                                        followeeUserId: item.id,
                                    },
                                })
                                await neighborsMutate()
                                await followeesMutate()
                            }}
                        />
                    )
                }}
            />
            <Spacer y={4} />
            <div className="flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}
