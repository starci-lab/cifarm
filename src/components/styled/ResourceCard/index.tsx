import React, { FC } from "react"
import { Image } from "@/components"
interface ResourceCardProps {
    amount: number
    iconImgSrc: string
}

export const ResourceCard: FC<ResourceCardProps> = ({ amount, iconImgSrc }) => {
    return (
        <div className="bg-background/50 rounded-r-md p-2 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <Image src={iconImgSrc} className="w-10 h-10"/>
            </div>
            <div className="text-sm mx-6">{amount}</div>
        </div>
    )
}