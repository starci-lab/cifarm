import { Skeleton, Spacer } from "@/components"
import { Card, CardContent } from "@/components"
import React, { FC } from "react"

export const NFTSkeleton: FC = () => {
    return <Card>
        <CardContent className="p-3">
            <Skeleton className="w-full aspect-square" />
            <Spacer y={4} />
            <Skeleton className="h-[20px] w-3/4" />
            <Spacer y={4} />
            <div className="grid gap-2">
                <div className="flex gap-2">
                    <Skeleton className="w-full h-[36px]" />
                    <Skeleton className="w-full h-[36px]" />
                </div>
                <Skeleton className="w-full h-[36px]" />
            </div>
        </CardContent>
    </Card>
}


