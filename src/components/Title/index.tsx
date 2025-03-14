import React, { FC } from "react"
import { ExclamationTooltip } from "../ExclamationTooltip"

export interface TitleProps {
    title: string
    tooltipString: string 
}

export const Title: FC<TitleProps> = ({ title, tooltipString }: TitleProps) => {
    return (
        <div className="flex items-center gap-1">
            <div className="text-sm">{title}</div>
            <ExclamationTooltip message={tooltipString}/>
        </div>
    )
}

