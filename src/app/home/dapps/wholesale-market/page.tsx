"use client"

import { Spacer } from "@/components"
import { Header } from "@/components"
import { BlurEffect } from "@/components"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { BulkCard } from "./BulkCard"
import { SeasonBanner } from "./SeasonBanner"

const Page: FC = () => {
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(QUERY_STATIC_SWR_MUTATION)
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" className="-z-10" />
            <Header title="Wholesale Market" />
            <Spacer y={6} />
            <SeasonBanner />
            <Spacer y={6} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    staticSwr.data?.data.wholesaleMarket.bulks.map((bulk) => (
                        <BulkCard key={bulk.bulkId} bulk={bulk} />
                    ))
                }
            </div>
        </div>
    )
}

export default Page
