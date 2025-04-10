import { Card, CardContent, ScaledImage } from "@/components"
import React, { FC } from "react"
import { AssetUi, assetUiMap } from "@/modules/assets"

interface ItemCardProps {
  quantity?: number
  stackable?: boolean
  imageUrl?: string 
  frameOnly?: boolean
  onClick?: () => void
  selected?: boolean
}

export const ItemCard: FC<ItemCardProps> = ({ quantity, stackable, imageUrl, frameOnly, onClick, selected }) => {
    return (
        <Card className="w-fit h-fit p-0 min-w-fit min-h-fit border-none shadow-none cursor-pointer" onClick={onClick}>
            <CardContent className="grid place-items-center p-0 w-fit h-fit relative">
                <ScaledImage src={assetUiMap[AssetUi.Frame].base.assetUrl} className="relative"/>
                {
                    (!frameOnly) &&  (() => {
                        return (<div className="absolute w-14 h-14">
                            <ScaledImage
                                src={
                                    imageUrl ?? ""
                                }
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    filter: selected ? "grayscale(100%)" : "grayscale(0%)",
                                }}
                            />
                            {stackable && (
                                <div className="absolute bottom-0 right-0 bg-background/50 text-sm grid place-items-center rounded-md p-1">
                                    {quantity}
                                </div>
                            )}
                        </div>
                        )
                    })()
                }
            </CardContent>
        </Card>
    )
}
