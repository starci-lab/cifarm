import {
    ExtendedButton,
    Slider,
    Spacer,
    Tabs,
    TabsList,
    TabsTrigger,
    Title,
} from "@/components"
import React, { FC } from "react"
import {
    useAppDispatch,
    useAppSelector,
    setNeighborsSearchStatus,
    NeighborsSearchStatus,
    setNeighborsSearchLevelRange,
    setAppliedNeighborsSearch,
} from "@/redux"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryUserSwr, useGraphQLQueryStaticSwr } from "@/hooks"
import {
    QUERY_USER_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
} from "@/app/constants"

export interface RenderLevelRangeParams {
  levelRange: number;
  startLevel: number;
  yourLevel: number;
}

export interface RenderLevelResult {
    text: string 
    levelStart?: number
    levelEnd?: number
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
        (state) => state.searchReducer.neighborsSearch
    )
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(QUERY_USER_SWR_MUTATION)
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    return (
        <div className="px-3 py-2 w-full">
            <Title
                title="Advanced Search"
                tooltipString="Advanced search allows you to search for neighbors with more specific criteria."
            />
            <Spacer y={6} />
            <div>
                <div className="flex gap-4 items-center justify-between">
                    <div className="text-sm">Level range</div>
                    <div className="text-sm">
                        {getLevelRange({
                            levelRange: neighborsSearch.levelRange,
                            startLevel:
                staticSwr.data?.data.interactionPermissions
                    .thiefLevelGapThreshold ?? 0,
                            yourLevel: userSwr.data?.data.user.level ?? 0,
                        }).text}
                    </div>
                </div>
                <Spacer y={2} />
                <div className="h-5 place-items-center grid">
                    <Slider
                        value={[neighborsSearch.levelRange]}
                        onValueChange={(value) =>
                            dispatch(setNeighborsSearchLevelRange(value[0]))
                        }
                        min={0}
                        max={100}
                        step={1}
                    />
                </div>
            </div>
            <Spacer y={4} />
            <div className="flex gap-4 items-center justify-between">
                <div className="text-sm">Status</div>
                <Tabs
                    defaultValue={neighborsSearch.status}
                    value={neighborsSearch.status}
                    onValueChange={(value) =>
                        dispatch(setNeighborsSearchStatus(value as NeighborsSearchStatus))
                    }
                >
                    <TabsList className="grid w-fit grid-cols-3">
                        <TabsTrigger value={NeighborsSearchStatus.All}>All</TabsTrigger>
                        <TabsTrigger value={NeighborsSearchStatus.Online}>
              Online
                        </TabsTrigger>
                        <TabsTrigger value={NeighborsSearchStatus.Offline}>
              Offline
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <Spacer y={6} />
            <ExtendedButton
                className="w-full"
                onClick={() =>
                    dispatch(
                        setAppliedNeighborsSearch({
                            levelRange: neighborsSearch.levelRange,
                            status: neighborsSearch.status,
                        })
                    )
                }
            >
        Apply
            </ExtendedButton>
        </div>
    )
}
