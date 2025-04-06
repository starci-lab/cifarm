import React, { FC } from "react"
import { NFTRarityEnum } from "@/modules/blockchain"
import { ExtendedBadge } from "@/components"
interface NFTRarityProps {
    rarity: NFTRarityEnum
}

interface NFTRarityData {
    className: string
    text: string
}

export const NFTRarity: FC<NFTRarityProps> = ({ rarity }) => {
    const rarityMap: Record<NFTRarityEnum, NFTRarityData> = {
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
    return <ExtendedBadge className={rarityMap[rarity].className}>
        <div className="text-sm">{rarityMap[rarity].text}</div>
    </ExtendedBadge>
}

