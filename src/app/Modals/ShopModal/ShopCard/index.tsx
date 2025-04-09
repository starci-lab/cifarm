import {
    QUERY_STATIC_SWR_MUTATION,
    QUERY_USER_SWR_MUTATION,
} from "@/app/constants"
import {
    AbsoluteCard,
    Card,
    CardContent,
    ExtendedButton,
    Image,
    ScaledImage,
} from "@/components"
import { BaseAssetKey, getAssetUrl, baseAssetMap } from "@/game"
import { useGraphQLQueryStaticSwr, useGraphQLQueryUserSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { LockIcon } from "lucide-react"
import React, { FC } from "react"

export interface ShopCardProps {
  onClick: () => void;
  imageUrl: string;
  price: number;
  ownership?: number;
  limit?: number;
  showLimit?: boolean;
  unlockedLevel: number;
}

export const ShopCard: FC<ShopCardProps> = ({ imageUrl, price, unlockedLevel, ownership, limit, showLimit = false }) => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(QUERY_USER_SWR_MUTATION)

    const goldEnough = (userSwr.data?.data.user.golds ?? 0) >= price
    const levelEnough = (userSwr.data?.data.user.level ?? 0) >= unlockedLevel
    const disabled = !goldEnough
    const locked = !levelEnough
    if (!staticSwr.data) {
        throw new Error("Static data not found")
    } 
    return (
        <Card>
            <CardContent className="p-0">
                <div className="relative">
                    <div className="p-2">
                        <AbsoluteCard classNames={{ container: "h-[100px]" }}>
                            <ScaledImage src={imageUrl} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                        </AbsoluteCard>
                        <div className="flex justify-center items-center">
                            <ExtendedButton
                                className="w-full"
                                variant="secondary"
                                disabled={disabled}
                            >
                                <Image
                                    src={getAssetUrl(
                                        baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig
                                            .assetUrl ?? ""
                                    )}
                                    className="w-5 h-5"
                                />
                                {price}
                            </ExtendedButton>
                        </div>
                        {showLimit && (
                            <div className="absolute w-full h-full blur-xs top-0 left-0 p-2">
                                <div className="flex gap-2 items-center justify-end">
                                    <div className="text-sm">
                                        {`${ownership}/${limit}`}
                                    </div>
                                </div>
                            </div>
                        )}
                        {locked && (
                            <div className="absolute w-full h-full blur-xs top-0 left-0 bg-black/50 p-2">
                                <div className="flex gap-1 items-center">
                                    <LockIcon className="w-4 h-4" />
                                    <div className="text-sm">
                                        {`Lv.${unlockedLevel}`}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
