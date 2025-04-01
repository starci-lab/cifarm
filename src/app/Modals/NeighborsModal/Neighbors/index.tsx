"use client"
import {
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
} from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { UserCard } from "../UserCard"
import { FilterBar, List } from "@/components"
import { RefreshCcw } from "lucide-react"
import { ExtendedButton } from "@/components"
import { Pagination } from "@/components/ui/pagination"

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
                    variant="outline"
                    size="icon"
                    onClick={() => neighborsMutate()}
                    className="shrink-0"
                >
                    <RefreshCcw className="h-4 w-4" />
                </ExtendedButton>
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
                            onUnfollowCallback={async() => {
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
