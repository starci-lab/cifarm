import React, { FC } from "react"
import { Image } from "@/components"
interface ResourceCardProps {
    text: string
    iconImgSrc: string
}

export const ResourceCard: FC<ResourceCardProps> = ({ text, iconImgSrc }) => {
    return (
        <div className="bg-background/50 rounded-r-md px-2 py-1.5 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <Image src={iconImgSrc} className="w-10 h-10"/>
            </div>
            <div className="text-sm mx-6">{text}</div>
        </div>
    )
}