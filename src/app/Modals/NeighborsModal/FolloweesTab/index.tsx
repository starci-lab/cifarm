"use client"
import {
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
    WS,
    NEIGHBORS_DISCLOSURE,
} from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLMutationUnfollowSwrMutation,
    useGraphQLQueryStaticSwr,
    toast,
    useWs,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useEffect } from "react"
import { FilterBar, List, Spacer } from "@/components"
import { ExtendedButton, Pagination, UserCard } from "@/components"
import { getLevelRange } from "../../NeighborsFilterModal/AdvancedSearchContent"
import { useAppSelector, useAppDispatch, setFolloweesSearchString, setActiveNeighborCard, setVisitedUser } from "@/redux"
import { NEIGHBORS_FILTER_DISCLOSURE } from "@/app/constants"
import { usePathname } from "next/navigation"
import { useDisclosure } from "react-use-disclosure"
import { ArrowsCounterClockwise } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { pathConstants } from "@/constants"
import { gameState } from "@/game/config"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"


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

    const user = useAppSelector(
        (state) => state.sessionReducer.user
    )

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    useEffect(() => {
        const thiefLevelGapThreshold =
            staticSwr.data?.data?.interactionPermissions?.thiefLevelGapThreshold

        if (!user?.level || !thiefLevelGapThreshold) return

        const { levelStart, levelEnd } = getLevelRange({
            levelRange: appliedLevelRange,
            startLevel: thiefLevelGapThreshold,
            yourLevel: user.level,
        })

        setParams?.((prev) => ({
            ...prev,
            request: {
                ...prev?.request,
                levelStart,
                levelEnd,
            },
        }))
    }, [
        appliedLevelRange,
        setParams,
        staticSwr.data?.data?.interactionPermissions?.thiefLevelGapThreshold,
        user?.level,
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
                            onVisitClick={async () => {
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
                            followed={item.followed}
                            onFollowClick={async () => {
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
