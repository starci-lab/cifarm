"use client"
import {
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    NEIGHBORS_MODAL_DISCLOSURE,
    WS,
} from "@/singleton"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLMutationUnfollowSwrMutation,
    useWs,
    EmitterEventName,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import React, { FC, useEffect } from "react"
import { FilterBar, List, Spacer } from "@/components"
import { ExtendedButton, Pagination, UserCard } from "@/components"
import { getLevelRange } from "../../NeighborsFilterModal/AdvancedSearchContent"
import {
    useAppSelector,
    useAppDispatch,
    setFolloweesSearchString,
    setActiveNeighborCard,
    setVisitedUser,
} from "@/redux"
import { NEIGHBORS_FILTER_MODAL_DISCLOSURE } from "@/singleton"
import { usePathname } from "next/navigation"
import { useDisclosure } from "react-use-disclosure"
import { ArrowsCounterClockwise } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { pathConstants } from "@/constants"
import { gameState } from "@/game/config"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import { addSuccessToast } from "@/modules/toast/extended"

export const FolloweesTab: FC = () => {
    const {
        swr: { mutate: followeesMutate },
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

    const followees = useAppSelector((state) => state.apiReducer.coreApi.followees.data)
    const count = useAppSelector((state) => state.apiReducer.coreApi.followees.count)
    // compute the total number of pages
    const limit = params?.request?.limit ?? DEFAULT_LIMIT
    const offset = params?.request?.offset ?? DEFAULT_OFFSET
    const totalPage = Math.max(Math.ceil(count / limit), 1)
    const currentPage = Math.ceil(offset / limit) + 1

    const appliedLevelRange = useAppSelector(
        (state) =>
            state.modalReducer.neighborsFilterModal.followeesSearch.appliedLevelRange
    )

    const user = useAppSelector((state) => state.apiReducer.coreApi.user)
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    useEffect(() => {
        const thiefLevelGapThreshold =
      staticData?.interactionPermissions.thiefLevelGapThreshold

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
        staticData?.interactionPermissions.thiefLevelGapThreshold,
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
        (state) => state.modalReducer.neighborsFilterModal.followeesSearch
    )

    const { open: openFilterModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NEIGHBORS_FILTER_MODAL_DISCLOSURE)
    const { close: closeNeighborsModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NEIGHBORS_MODAL_DISCLOSURE)
    const neighborsTab = useAppSelector((state) => state.tabReducer.neighborsTab)
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

                                await Promise.all([neighborsMutate(), followeesMutate()])
                                addSuccessToast({
                                    successMessage: "Unfollowed successfully",
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
