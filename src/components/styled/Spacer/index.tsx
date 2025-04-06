import { cn } from "@/lib/utils"
import React, { FC } from "react"
export interface SpacerProps {
    y: number
}

export const Spacer: FC<SpacerProps> = ({ y }: SpacerProps) => {
    let yValue = "h-1"
    switch (y) {
    case 1:
        yValue = "h-1"
        break
    case 1.5:
        yValue = "h-1.5"
        break
    case 2:
        yValue = "h-2"
        break
    case 3:
        yValue = "h-3"
        break
    case 4:
        yValue = "h-4"
        break
    case 5:
        yValue = "h-5"
        break
    case 6:
        yValue = "h-6"
        break
    }
    return <div className={cn(yValue)} />
}   
