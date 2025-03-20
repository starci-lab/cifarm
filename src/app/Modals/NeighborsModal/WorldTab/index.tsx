"use client"
import { GRAPHQL_QUERY_NEIGHBORS_SWR, GRAPHQL_QUERY_FOLLOWEES_SWR } from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Button, Card, Divider, Link, Pagination, ScrollShadow, Spacer } from "@heroui/react"
import React, { FC } from "react"
import { UserCard } from "../UserCard"
import { FilterBar } from "@/components"
import { RefreshCcw } from "lucide-react"

export const WorldTab: FC = () => {
    const {
        swr: { data, mutate: neighborsMutate },
        params,
        setParams,
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryNeighborsSwr>>(
        GRAPHQL_QUERY_NEIGHBORS_SWR
    )

    const {
        swr: { mutate: followeesMutate },
    } =
    useSingletonHook<ReturnType<typeof useGraphQLQueryFolloweesSwr>>(
        GRAPHQL_QUERY_FOLLOWEES_SWR
    )

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
        <div className="relative">
            <div className="flex gap-2">
                <FilterBar
                    handleSearchResult={
                        ({ searchString }) => {
                            if (!setParams) throw new Error("setParams is not defined")
                            setParams({
                                ...params,
                                request: {
                                    ...params?.request,
                                    searchString
                                },
                            })
                        }}
                />
                <Button variant="light" isIconOnly onPress={() => neighborsMutate()}>
                    <Link color="primary">
                        <RefreshCcw className="w-5 h-5" />
                    </Link>
                </Button>
            </div>
            <Spacer y={4} />
            <ScrollShadow
                hideScrollBar
                className="h-[300px] relative -top-4 -left-4 p-4 w-[calc(100%+32px)]"
            >
                <Card>
                    {neighbors.map((neighbor, index) => {
                        const last = index === neighbors.length - 1
                        return (
                            <>
                                <UserCard
                                    key={neighbor.id}
                                    user={neighbor}
                                    onFollowCallback={async () => {
                                        await neighborsMutate()
                                        await followeesMutate()
                                    }}
                                    onUnfollowCallback={async () => {
                                        await neighborsMutate()
                                        await followeesMutate()
                                    }}
                                />
                                {!last && <Divider />}
                            </>
                        )
                    })}
                </Card>
            </ScrollShadow>
            <Spacer y={4} />
            <div className="w-full flex justify-center">
                <Pagination
                    classNames={{
                        cursor: "light text-background",
                    }}
                    color="primary"
                    showControls
                    page={currentPage}
                    total={totalPage}
                    onChange={setPage}
                />
            </div>
        </div>
    )
}
