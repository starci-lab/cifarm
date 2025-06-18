"use client"

import React, { FC } from "react"
import { Spacer, Card, CardBody } from "@/components"
import dayjs from "dayjs"
import { Clock } from "@phosphor-icons/react"
import { useAppSelector } from "@/redux"

export const SeasonBanner: FC = () => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    if (!staticData?.activeSeason) return null
    return (
        <Card className="bg-primary/10">
            <CardBody>
                <div className="text-xl text-primary leading-none">
                    {staticData?.activeSeason.name}
                </div>
                <Spacer y={4} />
                <div className="text-muted-foreground">
                    {staticData?.activeSeason.description}
                </div>
                <Spacer y={4} />
                <div className="flex items-center gap-2">
                    <Clock />
                    {dayjs(staticData?.activeSeason.startDate).format(
                        "DD MMM, YYYY"
                    )} - {dayjs(staticData?.activeSeason.endDate).format("DD MMM, YYYY")}
                </div>
            </CardBody>
        </Card>
    )
}
