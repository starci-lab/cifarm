import {
    Slider,
    Spacer,
    Tabs,
    TabsList,
    TabsTrigger,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Title,
} from "@/components"   
import React, { FC } from "react"
import {
    useAppDispatch,
    useAppSelector,
    setNeighborsSearchStatus,
    NeighborsSearchStatus,
    setNeighborsSearchLevelRange,
    setFolloweesSearchLevelRange,
    setFolloweesSearchStatus,
    setUseAdvancedNeighborsSearch,
    setUseAdvancedFolloweesSearch,
    NeighborsModalTab,
} from "@/redux"

export interface RenderLevelRangeParams {
  levelRange: number;
  startLevel: number;
  yourLevel: number;
}

export interface RenderLevelResult {
  text: string;
  levelStart?: number;
  levelEnd?: number;
}

export const getLevelRange = ({
    levelRange,
    startLevel,
    yourLevel,
}: RenderLevelRangeParams): RenderLevelResult => {
    if (levelRange === 100) {
        return {
            text: "Unlimited",
        }
    }
    const actualRange = levelRange + startLevel
    const levelStart = Math.max(yourLevel - actualRange, 1)
    const levelEnd = yourLevel + actualRange
    return {
        text: `${levelStart} - ${levelEnd}`,
        levelStart,
        levelEnd,
    }
}

export const AdvancedSearchContent: FC = () => {
    const dispatch = useAppDispatch()
    const neighborsSearch = useAppSelector(
        (state) => state.modalReducer.neighborsFilterModal.neighborsSearch
    )
    const followeesSearch = useAppSelector(
        (state) => state.modalReducer.neighborsFilterModal.followeesSearch
    )
    const selectedSearchTab = useAppSelector((state) => state.modalReducer.neighborsModal.selectedTab)
    const search =
    selectedSearchTab === NeighborsModalTab.Neighbors ? neighborsSearch : followeesSearch

    const user = useAppSelector(
        (state) => state.apiReducer.coreApi.user
    )
    const staticData = useAppSelector(
        (state) => state.apiReducer.coreApi.static
    )

    const levelRangeText = getLevelRange({
        levelRange: search.levelRange,
        startLevel:
            staticData?.interactionPermissions.thiefLevelGapThreshold ?? 0,
        yourLevel: user?.level ?? 0,
    }).text

    const setSearchLevelRange = (value: number) => {
        switch (selectedSearchTab) {
        case NeighborsModalTab.Neighbors:
            dispatch(setNeighborsSearchLevelRange(value))
            break
        case NeighborsModalTab.Followees:
            dispatch(setFolloweesSearchLevelRange(value))
            break
        }
    }

    const setSearchStatus = (value: NeighborsSearchStatus) => {
        switch (selectedSearchTab) {
        case NeighborsModalTab.Neighbors:
            dispatch(setNeighborsSearchStatus(value))
            break
        case NeighborsModalTab.Followees:
            dispatch(setFolloweesSearchStatus(value))
            break
        }
    }

    const useAdvancedSearch = (() => {
        switch (selectedSearchTab) {
        case NeighborsModalTab.Neighbors:
            return neighborsSearch.useAdvancedSearch
        case NeighborsModalTab.Followees:
            return followeesSearch.useAdvancedSearch
        }
    })()

    return (
        <Accordion
            type="single"
            collapsible
            value={useAdvancedSearch ? OPEN : ""}
            onValueChange={(value) => {
                switch (selectedSearchTab) {
                case NeighborsModalTab.Neighbors:
                    dispatch(setUseAdvancedNeighborsSearch(value === OPEN))
                    break
                case NeighborsModalTab.Followees:
                    dispatch(setUseAdvancedFolloweesSearch(value === OPEN))
                    break
                }
            }}
        >
            <AccordionItem value={OPEN} className="border-none">
                <AccordionTrigger>
                    <div className="text-sm text-primary hover:text-primary/75">
            Advanced Search
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="bg-content-2 rounded-lg p-3">
                        <div className="flex gap-4 items-center justify-between">
                            <Title
                                title="Level range"
                                classNames={{
                                    title: "text-sm",
                                }}
                            />
                            <div className="text-sm">{levelRangeText}</div>
                        </div>
                        <Spacer y={2} />
                        <div className="h-5 place-items-center grid">
                            <Slider
                                value={[search.levelRange]}
                                onValueChange={(value) => setSearchLevelRange(value[0])}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </div>

                        <Spacer y={4} />

                        {/* Status Tabs Section */}
                        <div className="flex gap-4 items-center justify-between">
                            <Title
                                title="Status"
                                classNames={{
                                    title: "text-sm",
                                }}
                            />
                            <Tabs
                                defaultValue={search.status}
                                value={search.status}
                                onValueChange={(value) =>
                                    setSearchStatus(value as NeighborsSearchStatus)
                                }
                            >
                                <TabsList className="grid w-fit grid-cols-3">
                                    <TabsTrigger value={NeighborsSearchStatus.All}>
                    All
                                    </TabsTrigger>
                                    <TabsTrigger value={NeighborsSearchStatus.Online}>
                    Online
                                    </TabsTrigger>
                                    <TabsTrigger value={NeighborsSearchStatus.Offline}>
                    Offline
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

const OPEN = "open"
