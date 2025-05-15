"use client"
import {
    NEIGHBORS_FILTER_DISCLOSURE,
    QUERY_USER_SWR_MUTATION,
    QUERY_FOLLOWEES_SWR_MUTATION,
    QUERY_NEIGHBORS_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import React, { FC, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    ExtendedButton,
    FilterBar,
    Spacer,
} from "@/components"
import { AdvancedSearchContent, getLevelRange } from "./AdvancedSearchContent"
import { useAppSelector, NeighborsTab, useAppDispatch, setNeighborsSearchString, setFolloweesSearchString } from "@/redux"
import { ArrowCounterClockwise } from "@phosphor-icons/react"
import {
    useGraphQLQueryUserSwr,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
    useGraphQLQueryStaticSwr,
} from "@/hooks"
export const NeighborsFilterModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        NEIGHBORS_FILTER_DISCLOSURE
    )

    const neighborsTab = useAppSelector(
        (state) => state.tabReducer.neighborsTab
    )
    const neighborsSearch = useAppSelector(
        (state) => state.searchReducer.neighborsSearch
    )
    const followeesSearch = useAppSelector(
        (state) => state.searchReducer.followeesSearch
    )
    const useAdvancedSearch =
    neighborsTab === NeighborsTab.Neighbors
        ? neighborsSearch.useAdvancedSearch
        : followeesSearch.useAdvancedSearch

    const { swr: neighborsSwr, setParams: setNeighborsParams } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryNeighborsSwr>
  >(QUERY_NEIGHBORS_SWR_MUTATION)

    const { swr: followeesSwr, setParams: setFolloweesParams } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryFolloweesSwr>
  >(QUERY_FOLLOWEES_SWR_MUTATION)

    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(QUERY_USER_SWR_MUTATION)

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    // update the params whenever the neighborsSearch changes
    useEffect(() => {
        const levelRange = getLevelRange({
            levelRange: neighborsSearch.levelRange,
            startLevel:
        staticSwr.data?.data.interactionPermissions.thiefLevelGapThreshold ?? 0,
            yourLevel: userSwr.data?.data.user.level ?? 0,
        })
        setNeighborsParams?.({
            request: {
                levelStart: levelRange.levelStart,
                levelEnd: levelRange.levelEnd,
                searchString: neighborsSearch.searchString,
                status: neighborsSearch.status,
            },
        })
    }, [neighborsSearch])

    // update the params whenever the followeesSearch changes
    useEffect(() => {
        const levelRange = getLevelRange({
            levelRange: followeesSearch.levelRange,
            startLevel:
        staticSwr.data?.data.interactionPermissions.thiefLevelGapThreshold ?? 0,
            yourLevel: userSwr.data?.data.user.level ?? 0,
        })
        setFolloweesParams?.({
            request: {
                levelStart: levelRange.levelStart,
                levelEnd: levelRange.levelEnd,
                searchString: followeesSearch.searchString,
                status: followeesSearch.status,
            },
        })
    }, [followeesSearch])

    const dispatch = useAppDispatch()

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <div>
                    <div className="flex items-center gap-2">
                        <FilterBar
                            className="bg-transparent flex-1"
                            classNames={{
                                input: "focus-within:ring-0",
                            }}
                            placeholder={"Username, email, ID, etc."}
                            onSearchStringChange={(searchString) => {
                                switch (neighborsTab) {
                                case NeighborsTab.Neighbors:
                                    dispatch(setNeighborsSearchString(searchString))
                                    break
                                case NeighborsTab.Followees:
                                    dispatch(setFolloweesSearchString(searchString))
                                    break
                                }
                            }}
                            searchString={
                                (() => {
                                    switch (neighborsTab) {
                                    case NeighborsTab.Neighbors:
                                        return neighborsSearch.searchString
                                    case NeighborsTab.Followees:
                                        return followeesSearch.searchString
                                    }
                                })()
                            }
                        />
                        <ExtendedButton
                            variant="flat"
                            size="icon"
                            color="secondary"
                            className="shrink-0"
                        >
                            <ArrowCounterClockwise />
                        </ExtendedButton>
                    </div>
                    <Spacer y={4} />
                    {!useAdvancedSearch && <AdvancedSearchContent />}
                    <DialogFooter>
                        <ExtendedButton
                            isLoading={neighborsSwr.isValidating || followeesSwr.isValidating}
                            onClick={async () => {
                                switch (neighborsTab) {
                                case NeighborsTab.Neighbors:
                                    await neighborsSwr.mutate()
                                    break
                                case NeighborsTab.Followees:
                                    await followeesSwr.mutate()
                                    break
                                }
                            }}
                            color="primary"
                            className="w-full"
                        >
              Search
                        </ExtendedButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
