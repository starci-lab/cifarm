import { Card, CardContent, ExtendedButton, ItemImage, Image } from "@/components"
import { BaseAssetKey, getAssetUrl, baseAssetMap } from "@/game"
import React, { FC } from "react"

export interface ShopCardProps {
    onClick: () => void
    imageUrl: string
    price: number
    ownership: number
    limit: number
    locked: boolean
    unlockedLevel: number
    disabled: boolean
}

export const ShopCard: FC<ShopCardProps> = ({ imageUrl, price }) => {
    return <Card>
        <CardContent className="p-2">
            <div>
                <div className="flex justify-center items-center">
                    <ItemImage src={imageUrl}/>
                </div>
                <div className="flex justify-center items-center">
                    <ExtendedButton className="w-full" variant="secondary">
                        <Image src={getAssetUrl(baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.assetUrl ?? "")} className="w-5 h-5" />
                        {price}
                    </ExtendedButton>
                </div>
            </div>
        </CardContent>
    </Card>
}
