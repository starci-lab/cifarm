import React, { FC } from "react"
import {
    PaymentIcon,
    PressableCard,
    ScaledImage,
    Spacer,
    Spinner,
    PressableCardProps,
    Separator,
} from "@/components"
import { PaymentKind } from "@/modules/entities"

export type BuyCardProps = PressableCardProps & {
  title: string;
  imageUrl: string;
  price: number;
  paymentKind: PaymentKind;
  classNames?: {
    container?: string;
  };
  isLoading?: boolean;
  onClick?: () => void;
};
export const BuyCard: FC<BuyCardProps> = ({
    title,
    imageUrl,
    price,
    paymentKind,
    classNames,
    onClick,
    isLoading,
    disabled,
    ...props
}) => {
    return (
        <PressableCard
            className={classNames?.container}
            onClick={onClick}
            {...props}
            disabled={isLoading || disabled}
        >
            <div className="w-full">
                <div className="w-20 h-20 relative">
                    <ScaledImage
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        src={imageUrl}
                        alt={title}
                        scale={2}
                    />
                </div>
                <Spacer y={2} />
                <div className="flex gap-2 items-center">
                    {isLoading && <Spinner />}
                    <div className="text-lg text-text">{title}</div>
                </div>
                <Separator/>
                <Spacer y={2} />
                <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                        <PaymentIcon paymentKind={paymentKind} />
                        <div className="text-secondary">{price}</div>
                    </div>
                </div>
            </div>
        </PressableCard>
    )
}
