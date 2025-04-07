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
    case 8:
        yValue = "h-8"
        break
    case 10:
        yValue = "h-10"
        break
    case 12:
        yValue = "h-12"
        break
    case 16:
        yValue = "h-16"
        break  
    }

    return <div className={cn(yValue)} />
}   
