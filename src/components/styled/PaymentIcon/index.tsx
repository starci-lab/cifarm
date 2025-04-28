import React, { FC } from "react"
import { PaymentKind } from "@/modules/entities"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { Image } from "../Image"
import { cn } from "@/lib/utils"

interface PaymentIconProps {
    paymentKind: PaymentKind
    className?: string
}

export const PaymentIcon: FC<PaymentIconProps> = ({ paymentKind, className }) => {
    return <Image
        src={paymentIconMap[paymentKind]}
        className={cn("w-5 h-5", className)}
    />
}

export const paymentIconMap: Record<PaymentKind, string> = {
    [PaymentKind.Token]: assetIconMap[AssetIconId.Token].base.assetUrl, 
    [PaymentKind.USDC]: assetIconMap[AssetIconId.USDC].base.assetUrl,
    [PaymentKind.USDT]: assetIconMap[AssetIconId.USDT].base.assetUrl,
}
