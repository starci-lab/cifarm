import React, { FC } from "react"
import { Card, Separator } from "@/components"

interface ItemCardProps {
    name: string
    description: string
    assetUrl: string
}

export const ItemCard: FC<ItemCardProps> = ({ name, description, assetUrl }) => {
    return (
        <Card className="border rounded-lg p-4 flex flex-col items-center w-40">
            <img src={assetUrl} alt={name} className="w-16 h-16 mb-2" />
            <Separator />
            <div className="font-bold text-center text-foreground">{name}</div>
            <div className="text-xs text-text-foreground text-center line-clamp-3">{description}</div>
        </Card>
    )
}
