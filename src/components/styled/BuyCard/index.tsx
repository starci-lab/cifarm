import React, { FC } from "react"
import {
    TokenIcon,
    ScaledImage,
    Spinner,
    ImageScale,
    Card,
    CardBody,
    CardFooter,
} from "@/components"
import { TokenKey, Tokens } from "@/modules/entities"
import { ChainKey, Network } from "@/modules/blockchain"

export interface BuyCardProps {
  title: string;
  imageUrl: string;
  price: number;
  tokenKey: TokenKey;
  chainKey: ChainKey;
  network: Network;
  tokens: Tokens;
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
    tokenKey,
    chainKey,
    network,
    tokens,
    classNames,
    onClick,
    isLoading,
    ...props
}) => {
    return (
        <Card
            className={classNames?.container}
            onClick={onClick}
            pressable
            {...props}
            disabled={isLoading}
        >
            <CardBody className="w-full">
                <div className="w-20 h-20 relative">
                    <ScaledImage
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        src={imageUrl}
                        alt={title}
                        imageScale={ImageScale.Size2}
                    />
                </div>
            </CardBody>
            <CardFooter className="w-full">
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-2 items-center">
                        {isLoading && <Spinner />}
                        <div className="text-lg text-text">{title}</div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <TokenIcon
                            tokenKey={tokenKey}
                            chainKey={chainKey}
                            network={network}
                            tokens={tokens}
                        />
                        <div>{price}</div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
