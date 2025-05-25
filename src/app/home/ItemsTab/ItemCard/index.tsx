import React, { FC } from "react"
import { Card, CardBody, CardFooter, NFTBadge, ScaledImage, ImageScale } from "@/components"

interface ItemCardProps {
    name: string
    description: string
    assetUrl: string
    isNFT?: boolean
}

export const ItemCard: FC<ItemCardProps> = ({ name, description, assetUrl, isNFT = false }) => {
    return (
        <Card className="rounded-lg w-40" pressable>
            <CardBody className="relative p-3 w-full">
                {isNFT && <NFTBadge className="absolute top-3 right-3" />}
                <div className="w-14 h-14 grid place-items-center w-full">
                    <ScaledImage src={assetUrl} alt={name} imageScale={ImageScale.Size2}/>
                </div>
            </CardBody>
            <CardFooter className="p-3">
                <div className="grid place-items-center">
                    <div className="flex items-center gap-2">
                        <div className="text-center text-foreground text-lg">{name}</div>
                    </div>
                    
                    <div className="text-sm text-text-foreground text-center line-clamp-3">{description}</div>
                </div>
            </CardFooter>
        </Card>
    )
}
