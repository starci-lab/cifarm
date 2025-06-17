"use client"

import React, { FC } from "react"
import { useSingletonHook } from "@/singleton"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/singleton"
import { Spacer, Card, CardBody } from "@/components"
import dayjs from "dayjs"
import { Clock } from "@phosphor-icons/react"

export const SeasonBanner: FC = () => {
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(QUERY_STATIC_SWR_MUTATION)
    return (
        <Card className="bg-primary/10">
            <CardBody>
                <div className="text-xl text-primary leading-none">{staticSwr.data?.data.activeSeason.name}</div>
                <Spacer y={4}/>
                <div className="text-muted-foreground">
                    {staticSwr.data?.data.activeSeason.description}
                </div>
                <Spacer y={4}/>
                <div className="flex items-center gap-2">
                    <Clock />
                    {dayjs(staticSwr.data?.data.activeSeason.startDate).format("DD MMM, YYYY")} - {dayjs(staticSwr.data?.data.activeSeason.endDate).format("DD MMM, YYYY")}
                </div>
            </CardBody>
        </Card>
    )
}
