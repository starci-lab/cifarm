"use client"

import { Skeleton } from "@/components"
import React, { FC } from "react"

export const NFTCardSkeleton: FC = () => {
    return <Skeleton className="h-[208px] bg-content1 p-3">
        <div className="w-full h-full relative">
            <Skeleton className="w-[60px] h-8 absolute top-0 left-0"/>
            <Skeleton className="w-[150px] h-9 absolute bottom-0 left-0"/>
        </div>
    </Skeleton>  
}
