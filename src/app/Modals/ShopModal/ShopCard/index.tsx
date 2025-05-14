import {
    QUERY_STATIC_SWR_MUTATION,
    QUERY_USER_SWR_MUTATION,
} from "@/app/constants"
import {
    Card,
    CardContent,
    ExtendedButton,
    Image,
    ScaledImage,
} from "@/components"
import { assetUiMap, AssetUIId, assetIconMap, AssetIconId } from "@/modules/assets"
import { useGraphQLQueryStaticSwr, useGraphQLQueryUserSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { cn } from "@/lib/utils"

export interface ShopCardProps {
  onTap: () => void;
  onPress?: (pressTime: number) => void;
  imageUrl: string;
  price: number;
  ownership?: number;
  limit?: number;
  showLimit?: boolean;
  unlockedLevel: number;
  disabled?: boolean;
}

export const ShopCard: FC<ShopCardProps> = ({ imageUrl, price, unlockedLevel, ownership, limit, showLimit = false, onTap, onPress, disabled = false }) => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(QUERY_USER_SWR_MUTATION)

    const goldEnough = (userSwr.data?.data.user.golds ?? 0) >= price
    const levelEnough = (userSwr.data?.data.user.level ?? 0) >= unlockedLevel
    const _disabled = disabled || (!goldEnough || !levelEnough || (
        typeof ownership === "number" && typeof limit === "number" && ownership >= limit
    ))
    const locked = !levelEnough

    if (!staticSwr.data) {
        throw new Error("Static data not found")
    } 
    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <div className="relative">
                    <div className="p-2">
                        <div className="relative min-h-[100px] h-[100px] grid place-items-center">
                            <ScaledImage src={imageUrl} className="absolute"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <ExtendedButton
                                className="w-full"
                                disabled={_disabled}  
                                onTap={onTap}
                                onPress={onPress}
                            >
                                <Image
                                    src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                    className="w-5 h-5"
                                />
                                {price}
                            </ExtendedButton>
                        </div>
                        {locked && (
                            <div className={cn("p-2 rounded-md absolute top-0 right-0 w-full h-full bg-black/50")}>
                                <div className="flex gap-1 items-center relative h-8">
                                    <ScaledImage src={assetUiMap[AssetUIId.Locked].base.assetUrl}/>
                                    <div className="text-sm">
                                        {`Lv.${unlockedLevel}`}
                                    </div>
                                </div>
                            </div>
                        )}
                        {showLimit && (
                            <div className="text-sm absolute top-2 right-2 h-8 grid place-items-center">
                                {`${ownership}/${limit}`}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
