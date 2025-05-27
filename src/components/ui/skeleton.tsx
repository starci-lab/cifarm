import React, { FC } from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export const Skeleton: FC<SkeletonProps> = ({
    className,
    ...props
}) => {
    return (
        <div
            className={cn("animate-pulse rounded-lg bg-foreground/25", className)}
            {...props}
        />
    )
}