"use client"
import {
    NEIGHBORS_FILTER_MODAL_DISCLOSURE,
    GRAPHQL_QUERY_NEIGHBORS_SWR,
    GRAPHQL_QUERY_FOLLOWEES_SWR,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import React, { FC, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    ExtendedButton,
    FilterBar,
    Spacer,
    DialogBody,
} from "@/components"
import { AdvancedSearchContent, getLevelRange } from "./AdvancedSearchContent"
import {
    useAppSelector,
    useAppDispatch,
    setNeighborsSearchString,
    setFolloweesSearchString,
    setNeighborsSearchLevelRange,
    setNeighborsSearchStatus,
    setFolloweesSearchLevelRange,
    setFolloweesSearchStatus,
    NeighborsSearchStatus,
    setUseAdvancedNeighborsSearch,
    setUseAdvancedFolloweesSearch,
    setNeighborsSearchAppliedSearchString,
    setNeighborsSearchAppliedUseAdvancedSearch,
    setNeighborsSearchAppliedLevelRange,
    setNeighborsSearchAppliedStatus,
    setFolloweesSearchAppliedLevelRange,
    setFolloweesSearchAppliedSearchString,
    setFolloweesSearchAppliedStatus,
    setFolloweesSearchAppliedUseAdvancedSearch,
    NeighborsModalTab,
} from "@/redux"
import { ArrowCounterClockwise } from "@phosphor-icons/react"
import {
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
} from "@/singleton"
export const NeighborsFilterModal: FC = () => {
    const { toggle, isOpen, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NEIGHBORS_FILTER_MODAL_DISCLOSURE)

    const selectedTab = useAppSelector(
        (state) => state.modalReducer.neighborsModal.selectedTab
    )
    const neighborsSearch = useAppSelector(
        (state) => state.modalReducer.neighborsFilterModal.neighborsSearch
    )
    const followeesSearch = useAppSelector(
        (state) => state.modalReducer.neighborsFilterModal.followeesSearch
    )

    const { swr: neighborsSwr, setParams: setNeighborsParams } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryNeighborsSwr>
  >(GRAPHQL_QUERY_NEIGHBORS_SWR)

    const { swr: followeesSwr, setParams: setFolloweesParams } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryFolloweesSwr>
  >(GRAPHQL_QUERY_FOLLOWEES_SWR)

    // update the params whenever the neighborsSearch changes
    useEffect(() => {
        if (
            neighborsSearch.useAdvancedSearch !==
      neighborsSearch.appliedUseAdvancedSearch
        ) {
            dispatch(
                setNeighborsSearchAppliedUseAdvancedSearch(
                    neighborsSearch.useAdvancedSearch
                )
            )
        }
        if (neighborsSearch.searchString !== neighborsSearch.appliedSearchString) {
            dispatch(
                setNeighborsSearchAppliedSearchString(neighborsSearch.searchString)
            )
        }
        if (neighborsSearch.levelRange !== neighborsSearch.appliedLevelRange) {
            dispatch(setNeighborsSearchAppliedLevelRange(neighborsSearch.levelRange))
        }
        if (neighborsSearch.status !== neighborsSearch.appliedStatus) {
            dispatch(setNeighborsSearchAppliedStatus(neighborsSearch.status))
        }
    }, [
        neighborsSearch.levelRange,
        neighborsSearch.status,
        neighborsSearch.searchString,
        neighborsSearch.useAdvancedSearch,
    ])

    // update the params whenever the followeesSearch changes
    useEffect(() => {
        if (
            followeesSearch.useAdvancedSearch !==
      followeesSearch.appliedUseAdvancedSearch
        ) {
            dispatch(
                setFolloweesSearchAppliedUseAdvancedSearch(
                    followeesSearch.useAdvancedSearch
                )
            )
        }
        if (followeesSearch.searchString !== followeesSearch.appliedSearchString) {
            dispatch(
                setFolloweesSearchAppliedSearchString(followeesSearch.searchString)
            )
        }
        if (followeesSearch.levelRange !== followeesSearch.appliedLevelRange) {
            dispatch(setFolloweesSearchAppliedLevelRange(followeesSearch.levelRange))
        }
        if (followeesSearch.status !== followeesSearch.appliedStatus) {
            dispatch(setFolloweesSearchAppliedStatus(followeesSearch.status))
        }
    }, [
        followeesSearch.levelRange,
        followeesSearch.status,
        followeesSearch.searchString,
        followeesSearch.useAdvancedSearch,
    ])

    const dispatch = useAppDispatch()

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogBody>
                    <div className="flex items-center gap-2">
                        <FilterBar
                            className="bg-transparent flex-1"
                            classNames={{
                                input: "focus-within:ring-0",
                            }}
                            placeholder={"Username, email, ID, etc."}
                            onSearchStringChange={(searchString) => {
                                switch (selectedTab) {
                                case NeighborsModalTab.Neighbors:
                                    dispatch(setNeighborsSearchString(searchString))
                                    break
                                case NeighborsModalTab.Followees:
                                    dispatch(setFolloweesSearchString(searchString))
                                    break
                                }
                            }}
                            searchString={(() => {
                                switch (selectedTab) {
                                case NeighborsModalTab.Neighbors:
                                    return neighborsSearch.searchString
                                case NeighborsModalTab.Followees:
                                    return followeesSearch.searchString
                                }
                            })()}
                        />
                        <ExtendedButton
                            onClick={() => {
                                // reset the search string, level range, and status, and useAdvancedSearch
                                switch (selectedTab) {
                                case NeighborsModalTab.Neighbors:
                                    dispatch(setNeighborsSearchString(""))
                                    dispatch(setNeighborsSearchLevelRange(0))
                                    dispatch(
                                        setNeighborsSearchStatus(NeighborsSearchStatus.All)
                                    )
                                    dispatch(setUseAdvancedNeighborsSearch(false))
                                    break
                                case NeighborsModalTab.Followees:
                                    dispatch(setFolloweesSearchString(""))
                                    dispatch(setFolloweesSearchLevelRange(0))
                                    dispatch(
                                        setFolloweesSearchStatus(NeighborsSearchStatus.All)
                                    )
                                    dispatch(setUseAdvancedFolloweesSearch(false))
                                    break
                                }
                            }}
                            variant="flat"
                            size="icon"
                            color="secondary"
                            className="shrink-0"
                        >
                            <ArrowCounterClockwise />
                        </ExtendedButton>
                    </div>
                    <Spacer y={4} />
                    <AdvancedSearchContent />
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        isLoading={neighborsSwr.isValidating || followeesSwr.isValidating}
                        onClick={async () => {
                            const { levelStart, levelEnd } = getLevelRange({
                                levelRange: neighborsSearch.appliedLevelRange,
                                startLevel: neighborsSearch.appliedLevelRange,
                                yourLevel: neighborsSearch.appliedLevelRange,
                            })
                            switch (selectedTab) {
                            case NeighborsModalTab.Neighbors:
                                setNeighborsParams?.((prev) => ({
                                    ...prev,
                                    request: {
                                        ...prev?.request,
                                        searchString: neighborsSearch.appliedSearchString,
                                        status: neighborsSearch.appliedStatus,
                                        useAdvancedSearch:
                        neighborsSearch.appliedUseAdvancedSearch,
                                        levelEnd,
                                        levelStart,
                                    },
                                }))
                                break
                            case NeighborsModalTab.Followees:
                                setFolloweesParams?.((prev) => ({
                                    ...prev,
                                    request: {
                                        ...prev?.request,
                                        searchString: followeesSearch.appliedSearchString,
                                        status: followeesSearch.appliedStatus,
                                        useAdvancedSearch:
                        followeesSearch.appliedUseAdvancedSearch,
                                        levelEnd,
                                        levelStart,
                                    },
                                }))
                                break
                            }
                            close()
                        }}
                        color="primary"
                        className="w-full"
                    >
            Search
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
