import React, { FC } from "react"
import { NFTRarityEnum } from "@/modules/blockchain"
import { ExtendedBadge } from "@/components"
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
            className: "bg-gray-200",
            text: "Common",
        },
        [NFTRarityEnum.Rare]: {
            className: "bg-blue-200",
            text: "Rare",
        },
        [NFTRarityEnum.Epic]: {
            className: "bg-purple-200",
            text: "Epic",
        },
    }
    const data = rarityMap[rarity || NFTRarityEnum.Common]
    return <ExtendedBadge className={data.className}>
        <div className="text-xs">{data.text}</div>
    </ExtendedBadge>
}

