import React from "react"
import { ExtendedBadge } from "../ExtendedBadge"

interface NFTBadgeProps {
    name: string
}

export const NFTBadge: React.FC<NFTBadgeProps> = ({ name }) => {
    return (
        <ExtendedBadge className="bg-gradient-to-r from-purple-300 to-purple-700 text-white">
            {name}
        </ExtendedBadge>
    )
}
