import React from "react"
import { ExtendedBadge } from "../ExtendedBadge"
import { cn } from "@/lib/utils"

interface NFTBadgeProps {
    name?: string
    className?: string
}

export const NFTBadge: React.FC<NFTBadgeProps> = ({ name, className }) => {
    return (
        <ExtendedBadge className={cn("bg-gradient-to-r from-purple-300 to-purple-700 text-white", className)}>
            {name || "NFT"}
        </ExtendedBadge>
    )
}
