import React, { FC } from "react"
import { ScaledImage } from "@/components"
interface ResourceCardProps {
    amount: number
    iconImgSrc: string
}

export const ResourceCard: FC<ResourceCardProps> = ({ amount, iconImgSrc }) => {
    return (
        <div className="bg-background/50 rounded-r-md p-2 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <ScaledImage src={iconImgSrc}/>
            </div>
            <div className="text-sm mx-6">{amount}</div>
        </div>
    )
}