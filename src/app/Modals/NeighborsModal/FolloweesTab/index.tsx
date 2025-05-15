"use client"
import {
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    QUERY_USER_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
} from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLMutationUnfollowSwrMutation,
    useGraphQLQueryUserSwr,
    useGraphQLQueryStaticSwr,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useEffect } from "react"
import { FilterBar, List, Spacer } from "@/components"
import { ExtendedButton, Pagination, UserCard } from "@/components"
import { getLevelRange } from "../../NeighborsFilterModal/AdvancedSearchContent"
import { useAppSelector, useAppDispatch, setFolloweesSearchString } from "@/redux"
import { NEIGHBORS_FILTER_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import { ArrowsCounterClockwise } from "@phosphor-icons/react"

export const FolloweesTab: FC = () => {
    const {
        swr: { data, mutate: followeesMutate },
        params,
        setParams,
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryFolloweesSwr>>(
        GRAPHQL_QUERY_FOLLOWEES_SWR
    )

    const {
        swr: { mutate: neighborsMutate },
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryNeighborsSwr>>(
        GRAPHQL_QUERY_NEIGHBORS_SWR
    )

    const dispatch = useAppDispatch()

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

    const followeesSearch = useAppSelector(
        (state) => state.searchReducer.followeesSearch
    )

    const { open: openFilterModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_FILTER_DISCLOSURE)

    return (
        <div className="space-y-4">
            <div className="flex gap-2 w-full">
                <FilterBar
                    asButton
                    onClick={openFilterModal}
                    className="flex-1"
                    onSearchStringChange={(searchString) => {
                        dispatch(setFolloweesSearchString(searchString))
                    }}
                    searchString={followeesSearch.searchString}
                />
                <ExtendedButton
                    variant="flat"
                    size="icon"
                    color="secondary"
                    onClick={() => followeesMutate()}
                    className="shrink-0"
                >
                    <ArrowsCounterClockwise />
                </ExtendedButton>
            </div>
            <List
                items={followees}
                contentCallback={(item) => {
                    return (
                        <UserCard
                            user={item}
                            followed={item.followed}
                            onFollowCallback={async () => {
                                // nothing due to the fact that the followees are not followed
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
