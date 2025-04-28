import React, { FC } from "react"
import { PaymentIcon, PressableCard, ScaledImage, Spacer } from "@/components"
import { PaymentKind } from "@/modules/entities"

export interface BuyCardProps {
  title: string;
  imageUrl: string;
  price: number;
  paymentKind: PaymentKind;
  classNames?: {
    container?: string;
  };
  onClick?: () => void;
}
export const BuyCard: FC<BuyCardProps> = ({
    title,
    imageUrl,
    price,
    paymentKind,
    classNames,
    onClick,
}) => {
    return (
        <PressableCard className={classNames?.container} onClick={onClick}>
            <div className="w-20 h-20 relative">
                <ScaledImage
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src={imageUrl}
                    alt={title}
                    scale={2}
                />
            </div>
            <Spacer y={4} />
            <div>{title}</div>
            <Spacer y={4} />
            <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                    <PaymentIcon paymentKind={paymentKind} />
                    <div>{price}</div>
                </div>
            </div>
        </PressableCard>
    )
}
