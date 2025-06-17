import {
    Card,
    CardContent,
    ExtendedButton,
    Image,
    ScaledImage,
} from "@/components"
import {
    assetUiMap,
    AssetUIId,
    assetIconMap,
    AssetIconId,
} from "@/modules/assets"
import React, { FC } from "react"
import { cn } from "@/utils"
import { useAppSelector } from "@/redux"

export interface ShopCardProps {
  onTap: () => void;
  onPress?: (pressTime: number) => void;
  imageUrl: string;
  price: number;
  ownership?: number;
  limit?: number;
  showLimit?: boolean;
  unlockedLevel?: number;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ShopCard: FC<ShopCardProps> = ({
    imageUrl,
    price,
    unlockedLevel,
    ownership,
    limit,
    showLimit = false,
    onTap,
    onPress,
    disabled = false,
    isLoading = false,
}) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const user = useAppSelector(
        (state) => state.apiReducer.coreApi.user
    )

    const goldEnough = (user?.golds ?? 0) >= price
    const levelEnough = unlockedLevel ? ((user?.level ?? 0) >= (unlockedLevel)) : true
    const _disabled =
    disabled ||
    !goldEnough ||
    !levelEnough ||
    (typeof ownership === "number" &&
      typeof limit === "number" &&
      ownership >= limit)
    const locked = !levelEnough
        
    if (!staticData) {
        throw new Error("Static data not found")
    }
    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <div className="relative">
                    <div className="p-2">
                        <div className="relative min-h-[100px] h-[100px] grid place-items-center">
                            <ScaledImage src={imageUrl} className="absolute" />
                        </div>
                        <div className="flex justify-center items-center">
                            <ExtendedButton
                                isLoading={isLoading}
                                color="primary"
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
                            <div
                                className={cn(
                                    "p-2 rounded-md absolute top-0 right-0 w-full h-full bg-black/50"
                                )}
                            >
                                <div className="flex gap-1 items-center relative h-6">
                                    <div className="w-6 h-6 relative">
                                        <ScaledImage
                                            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                                            src={assetUiMap[AssetUIId.Locked].base.assetUrl}
                                        />
                                    </div>
                                    <div className="text-sm">{`Lv.${unlockedLevel}`}</div>
                                </div>
  
                            </div>
                        )}
                        {showLimit && (
                            <div className="text-sm absolute top-2 right-2 h-6 grid place-items-center">
                                {`${ownership}/${limit}`}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
