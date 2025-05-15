"use client"
import {
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    QUERY_USER_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
    WS,
    NEIGHBORS_DISCLOSURE,
} from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
    useGraphQLQueryStaticSwr,
    toast,
    useWs,
    EmitterEventName,
    useGraphQLQueryUserSwr,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useEffect } from "react"
import { FilterBar, List, Spacer } from "@/components"
import { ExtendedButton, Pagination, UserCard } from "@/components"
import { getLevelRange } from "../../NeighborsFilterModal/AdvancedSearchContent"
import { useAppSelector, useAppDispatch, setNeighborsSearchString, setActiveNeighborCard } from "@/redux"
import { NEIGHBORS_FILTER_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import { ArrowsCounterClockwise } from "@phosphor-icons/react"
import { pathConstants } from "@/constants"
import { usePathname, useRouter } from "next/navigation"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { setVisitedUser } from "@/redux"
import { gameState } from "@/game/config"

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
    const useAdvancedSearch = useAppSelector(
        (state) => state.searchReducer.neighborsSearch.useAdvancedSearch
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
                useAdvancedSearch,
            },
        })
    }, [
        appliedLevelRange,
        appliedStatus,
        userSwr.data?.data.user.level,
        staticSwr.data?.data.interactionPermissions.thiefLevelGapThreshold,
        setParams,
        useAdvancedSearch,
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

    const neighborsSearch = useAppSelector(
        (state) => state.searchReducer.neighborsSearch
    )

    const { open: openFilterModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_FILTER_DISCLOSURE)
    const dispatch = useAppDispatch()
    const { close: closeNeighborsModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_DISCLOSURE)
    const neighborsTab = useAppSelector(
        (state) => state.tabReducer.neighborsTab
    )
    const pathname = usePathname()
    const router = useRouter()
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    return (
        <div className="space-y-4">
            <div className="flex gap-2 w-full">
                <FilterBar
                    asButton
                    onClick={openFilterModal}
                    className="flex-1"
                    onSearchStringChange={(searchString) => {
                        dispatch(setNeighborsSearchString(searchString))
                    }}
                    searchString={neighborsSearch.searchString}
                />
                <ExtendedButton
                    variant="flat"
                    size="icon"
                    color="secondary"
                    onClick={() => neighborsMutate()}
                    className="shrink-0"
                >
                    <ArrowsCounterClockwise />
                </ExtendedButton>
            </div>
            <List
                items={neighbors}
                contentCallback={(item) => {
                    return (
                        <UserCard
                            user={item}
                            followed={item.followed}
                            onVisitClick={() => {
                                closeNeighborsModal()
                                dispatch(setActiveNeighborCard(neighborsTab))
                                if (pathname !== pathConstants.play) {
                                    router.push(pathConstants.play)
                                    gameState.data = {
                                        watchingUser: item,
                                    }
                                } else {
                                    if (!socket) {
                                        throw new Error("Socket is not connected")
                                    }
                                    socket.emit(EmitterEventName.Visit, {
                                        neighborUserId: item.id,
                                    })
                                    dispatch(setVisitedUser(item))
                                    ExternalEventEmitter.emit(ExternalEventName.Visit, item)
                                }
                            }}
                            onFollowClick={async () => {
                                await followSwrMutation.trigger({
                                    request: {
                                        followeeUserId: item.id,
                                    },
                                })

                                await Promise.all([
                                    neighborsMutate(),
                                    followeesMutate(),
                                ])

                                toast({
                                    title: "Followed successfully",
                                })
                            }}
                            onUnfollowClick={async () => {
                                await unfollowSwrMutation.trigger({
                                    request: {
                                        followeeUserId: item.id,
                                    },
                                })
                                await Promise.all([
                                    neighborsMutate(),
                                    followeesMutate(),
                                ])

                                toast({
                                    title: "Unfollowed successfully",
                                })
                            }}
                        />
                    )
                }}
            />
            <Spacer y={4} />
            <div className="flex justify-center">
                <Pagination
                    color="secondary"
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}
