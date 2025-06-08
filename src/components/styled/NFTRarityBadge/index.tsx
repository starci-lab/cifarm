import React, { FC } from "react"
import { NFTRarityEnum } from "@/modules/blockchain"
import { ExtendedBadge } from "@/components"
import { cn } from "@/lib/utils"

interface NFTRarityBadgeProps {
    rarity: NFTRarityEnum
    className?: string
}

interface NFTRarityBadgeData {
    className: string
    text: string
}

export const NFTRarityBadge: FC<NFTRarityBadgeProps> = ({ rarity, className }) => {
    const rarityMap: Record<NFTRarityEnum, NFTRarityBadgeData> = {
        [NFTRarityEnum.Common]: {
            className: "bg-gradient-to-r from-gray-300 to-gray-100 light text-foreground",
            text: "Common",
        },
        [NFTRarityEnum.Rare]: {
            className: "bg-gradient-to-r from-blue-500 to-blue-300 light text-background",
            text: "Rare",
        },
        [NFTRarityEnum.Epic]: {
            className: "bg-gradient-to-r from-purple-600 to-purple-400 light text-background",
            text: "Epic",
        },
    }
    const data = rarityMap[rarity || NFTRarityEnum.Common]
    return <ExtendedBadge className={cn(data.className, "justify-center", className)}>
        <div className="text-sm">{data.text}</div>
    </ExtendedBadge>
}

