"use client"

import {
    Card,
    CardBody,
    ScaledImage,
    Spacer,
    Image,
    Badge,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    Title,
    CardFooter,
} from "@/components"
import { TokenIcon } from "@/components"
import React, { FC, useEffect, useState } from "react"
import { ProductId, BulkSchema } from "@/types"
import { assetProductMap, assetIconMap, AssetIconId } from "@/modules/assets"
import { useSingletonHook } from "@/singleton"
import { useIsMobile } from "@/hooks"
import { WHOLSALE_MARKET_BULK_SHEET_DISCLOSURE } from "@/singleton"
import { cn } from "@/utils"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useDisclosure } from "react-use-disclosure"
import { setWholesaleMarketBulkSheetContent } from "@/redux"
import { envConfig } from "@/env"
import { ChainKey } from "@/modules/blockchain"
import { Plus } from "@phosphor-icons/react"
import { getPercentageString } from "@/modules/common"

interface BulkCardProps {
  bulk: BulkSchema;
}

export const BulkCard: FC<BulkCardProps> = ({ bulk }) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const [images, setImages] = useState<Array<string>>([])
    useEffect(() => {
        const assetImageUrls = bulk.products.map((product) => {
            const _product = staticData?.products.find(
                (pproduct) => pproduct.id === product.productId
            )
            return assetProductMap[_product?.displayId as ProductId].base.assetUrl
        })
        setImages(assetImageUrls)
    }, [staticData])
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        WHOLSALE_MARKET_BULK_SHEET_DISCLOSURE
    )
    const dispatch = useAppDispatch()
    const network = envConfig().network
    const isMobile = useIsMobile()
    const numberOfImages = isMobile ? 3 : 5
    if (!staticData?.tokens) return null
    return (
        <Card
            pressable
            onClick={() => {
                dispatch(setWholesaleMarketBulkSheetContent({ bulkId: bulk.id }))
                open()
            }}
        >
            <CardBody>
                <div className="flex items-center -gap-4">
                    {images.slice(0, numberOfImages).map((image, index) => {
                        if (
                            index === numberOfImages - 1 &&
              images.length > numberOfImages
                        ) {
                            // Hiển thị dấu "..." nếu có nhiều hơn 5 ảnh
                            return (
                                <div
                                    className={cn(
                                        "bg-content-6/50 rounded-full w-14 h-14",
                                        "rounded-full -ml-4",
                                        "grid place-items-center",
                                        "relative font-semibold text-center"
                                    )}
                                    key="more"
                                >
                  +{images.length - numberOfImages}
                                </div>
                            )
                        }

                        return (
                            <div
                                className={cn(
                                    "bg-content-6/50 rounded-full w-14 h-14",
                                    `${index !== 0 ? "-ml-4" : ""}`,
                                    "grid place-items-center",
                                    "relative"
                                )}
                                key={index}
                            >
                                <ScaledImage
                                    src={image}
                                    alt="Logo"
                                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                                />
                            </div>
                        )
                    })}
                </div>
                <Spacer y={4} />
                <div className="flex items-center gap-2">
                    <Title title={bulk.bulkName} />
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge>{getPercentageString(bulk.maxPaidPercentage)}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
              We will pay you {getPercentageString(bulk.maxPaidPercentage)} of
              the vault’s value, up to a maximum of {bulk.maxPaidAmount}.
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Spacer y={4} />
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <TokenIcon
                            tokenKey={bulk.tokenKey}
                            chainKey={ChainKey.Solana}
                            network={network}
                            tokens={staticData?.tokens}
                        />
                        <div>Up to {bulk.maxPaidAmount}</div>
                    </div>
                    <Plus className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-1">
                        <Image
                            src={assetIconMap[AssetIconId.TCIFARM].base.assetUrl}
                            alt="CIFARM"
                            className="w-6 h-6"
                        />
                        <div>{bulk.tCIFARM}</div>
                    </div>
                </div>
                <Spacer y={2} />
            </CardBody>
            <CardFooter className="w-full">
                <div className="text-sm text-muted-foreground text-start">
                    {bulk.description}
                </div>
            </CardFooter>
        </Card>
    )
}
