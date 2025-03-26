"use client"
import { GRAPHQL_QUERY_NEIGHBORS_SWR, GRAPHQL_QUERY_FOLLOWEES_SWR } from "@/app/constants"
import {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    useGraphQLQueryFolloweesSwr,
    useGraphQLQueryNeighborsSwr,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { UserCard } from "../UserCard"
import { FilterBar } from "@/components"
import { RefreshCcw } from "lucide-react"
import { EnhancedButton } from "@/components"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pagination } from "@/components/ui/pagination"

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
        <div className="space-y-4">
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
                <EnhancedButton 
                    variant="outline" 
                    size="icon"
                    onClick={() => neighborsMutate()}
                    className="shrink-0"
                >
                    <RefreshCcw className="h-4 w-4" />
                </EnhancedButton>
            </div>
            
            <ScrollArea className="h-[300px] rounded-md border">
                <Card>
                    <CardContent className="p-0">
                        {neighbors.map((neighbor, index) => {
                            const last = index === neighbors.length - 1
                            return (
                                <div key={neighbor.id}>
                                    <UserCard
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
                                    {!last && <Separator />}
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </ScrollArea>

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
