"use client"
import { GRAPHQL_QUERY_FOLLOWEES_SWR, GRAPHQL_QUERY_NEIGHBORS_SWR } from "@/app/constants"
import { DEFAULT_LIMIT, DEFAULT_OFFSET, useGraphQLQueryFolloweesSwr, useGraphQLQueryNeighborsSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { UserCard } from "../UserCard"
import { FilterBar } from "@/components"
import { RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pagination } from "@/components/ui/pagination"

export const FolloweesTab: FC = () => {
    const {
        swr: { mutate: neighborsMutate },
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryNeighborsSwr>>(
        GRAPHQL_QUERY_NEIGHBORS_SWR
    )
    
    const {
        swr: { data, mutate: followeesMutate },
        params,
        setParams,
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryFolloweesSwr>>(
        GRAPHQL_QUERY_FOLLOWEES_SWR
    )
    
    const followees = data?.data.followees.data || []
    const count = data?.data.followees.count || 0
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
                        }
                    }
                />
                <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => followeesMutate()}
                    className="shrink-0"
                >
                    <RefreshCcw className="h-4 w-4" />
                </Button>
            </div>
            
            <ScrollArea className="h-[300px] rounded-md border">
                <Card>
                    <CardContent className="p-0">
                        {followees.map((followee, index) => {
                            const last = index === followees.length - 1
                            return (
                                <div key={followee.id}>
                                    <UserCard
                                        user={followee}
                                        onFollowCallback={async () => {
                                            await neighborsMutate()
                                            await followeesMutate()
                                        }}
                                        onUnfollowCallback={async () => {
                                            await neighborsMutate()
                                            await followeesMutate()
                                        }}
                                        followed
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