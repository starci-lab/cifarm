import { cn } from "@/lib/utils"
import React, { FC } from "react"
export interface SpacerProps {
    y: number
}

export const Spacer: FC<SpacerProps> = ({ y }: SpacerProps) => {
    const yValue = `h-${y}`
    return <div className={cn(yValue)} />
}   
