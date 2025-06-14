"use client"

import { Card, CardBody, CardFooter, Skeleton, Spacer } from "@/components"
import React, { FC } from "react"

export const NFTCardSkeleton: FC = () => {
    return <Card>
        <CardBody>
            <div className="w-full h-full relative">
                <Skeleton className="w-[72px] h-[24px] absolute top-0 right-0"/>
                <Skeleton className="w-[96px] aspect-square"/>
                <Spacer y={4}/>
                <Skeleton className="w-[150px] h-[20px]"/>
            </div>
        </CardBody>
        <CardFooter>
            <Skeleton className="h-[16px] w-[200px]"/>
        </CardFooter>
    </Card>  
}
