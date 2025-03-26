import React, { FC } from "react"

export interface SpacerProps {
    y: number
}

export const Spacer: FC<SpacerProps> = ({ y }: SpacerProps) => {
    return <div className={`h-${y}`} />
}   
