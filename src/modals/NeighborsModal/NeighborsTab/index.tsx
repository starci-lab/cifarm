"use client"
import {
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
    GRAPHQL_MUTATION_FOLLOW_SWR_MUTATION,
    GRAPHQL_MUTATION_UNFOLLOW_SWR_MUTATION,
    NEIGHBORS_MODAL_DISCLOSURE,
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLMutationFollowSwrMutation,
    useGraphQLMutationUnfollowSwrMutation,
    WS,
    useWs,
    EmitterEventName,
} from "@/singleton"
import { addSuccessToast } from "@/modules/toast"
import { useSingletonHook } from "@/singleton"
import React, { FC, useEffect } from "react"
import { FilterBar, List, Spacer } from "@/components"
import { ExtendedButton, Pagination, UserCard } from "@/components"
import {
    useAppSelector,
    useAppDispatch,
    setNeighborsSearchString,
    setActiveNeighborCard,
} from "@/redux"
import { NEIGHBORS_FILTER_MODAL_DISCLOSURE } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { ArrowsCounterClockwise } from "@phosphor-icons/react"
import { pathConstants } from "@/constants"
import { usePathname, useRouter } from "next/navigation"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import { setVisitedUser } from "@/redux"
import { gameState } from "@/game/config"

export const NeighborsTab: FC = () => {
    const {
        swr: { mutate: neighborsMutate },
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

    const neighbors = useAppSelector(
        (state) => state.apiReducer.coreApi.neighbors.data
    )
    const count = useAppSelector(
        (state) => state.apiReducer.coreApi.neighbors.count
    )
    // compute the total number of pages
    const limit = params?.request?.limit ?? DEFAULT_LIMIT
    const offset = params?.request?.offset ?? DEFAULT_OFFSET
    const totalPage = Math.max(Math.ceil(count / limit), 1)
    const currentPage = Math.ceil(offset / limit) + 1

    const neighborsSearch = useAppSelector(
        (state) => state.modalReducer.neighborsFilterModal.neighborsSearch
    )

    const setPage = (page: number) => {
        setParams?.((prev) => ({
            ...prev,
            request: {
                ...prev?.request,
                offset: (page - 1) * limit,
            },
        }))
    }

    useEffect(() => {
        neighborsMutate()
    }, [params?.request?.offset])

    const { open: openFilterModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NEIGHBORS_FILTER_MODAL_DISCLOSURE)
    const dispatch = useAppDispatch()
    const { close: closeNeighborsModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NEIGHBORS_MODAL_DISCLOSURE)
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

                                await Promise.all([neighborsMutate(), followeesMutate()])

                                addSuccessToast({
                                    successMessage: "Followed successfully",
                                })
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
