import React, { FC } from "react"
import { NFTRarityEnum } from "@/modules/blockchain"
import { ExtendedBadge } from "@/components"
import { cn } from "@/lib/utils"
interface NFTRarityBadgeProps {
    rarity: NFTRarityEnum
}

interface NFTRarityBadgeData {
    className: string
    text: string
}

export const NFTRarityBadge: FC<NFTRarityBadgeProps> = ({ rarity }) => {
    const rarityMap: Record<NFTRarityEnum, NFTRarityBadgeData> = {
        [NFTRarityEnum.Common]: {
            className: "bg-gradient-to-r from-gray-300 to-gray-100",
            text: "Common",
        },
        [NFTRarityEnum.Rare]: {
            className: "bg-gradient-to-r from-blue-500 to-blue-300",
            text: "Rare",
        },
        [NFTRarityEnum.Epic]: {
            className: "bg-gradient-to-r from-purple-600 to-purple-400",
            text: "Epic",
        },
    }
    const data = rarityMap[rarity || NFTRarityEnum.Common]
    return <ExtendedBadge className={cn(data.className, "text-primary")}>
        <div>{data.text}</div>
    </ExtendedBadge>
}

