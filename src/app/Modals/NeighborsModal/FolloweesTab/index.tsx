"use client"
import {
    GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_QUERY_NEIGHBORS_SWR,
} from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { UserCard } from "../UserCard"
import { FilterBar, List, ExtendedButton, Pagination } from "@/components"
import { RefreshCcw } from "lucide-react"

export const FolloweesTab: FC = () => {
    const {
        swr: { mutate: neighborsMutate },
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryNeighborsSwr>>(
        GRAPHQL_QUERY_NEIGHBORS_SWR
    )

    const {
        swr: { data, mutate: followeesMutate },
        params,
        setParams,
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryFolloweesSwr>>(
        GRAPHQL_QUERY_FOLLOWEES_SWR
    )

    const { swrMutation: followSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationFollowSwrMutation>
  >(GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION)

    const { swrMutation: unfollowSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationUnfollowSwrMutation>
  >(GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION)

    const followees = data?.data.followees.data || []
    const count = data?.data.followees.count || 0
    // compute the total number of pages
    const limit = params?.request?.limit ?? DEFAULT_LIMIT
    const offset = params?.request?.offset ?? DEFAULT_OFFSET
    const totalPage = Math.max(Math.ceil(count / limit), 1)
    const currentPage = Math.ceil(offset / limit) + 1
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
            <div className="flex gap-2">
                <FilterBar
                    handleSearchResult={({ searchString }) => {
                        if (!setParams) throw new Error("setParams is not defined")
                        setParams({
                            ...params,
                            request: {
                                ...params?.request,
                                searchString,
                            },
                        })
                    }}
                />
                <ExtendedButton
                    variant="ghost"
                    size="icon"
                    onClick={() => followeesMutate()}
                    className="shrink-0"
                >
                    <RefreshCcw className="h-4 w-4" />
                </ExtendedButton>
            </div>
            <List
                items={followees}
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
