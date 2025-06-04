"use client"

import { Card, CardBody, CardHeader, ScaledImage, Spacer } from "@/components"
import { TokenIcon } from "@/components"
import React, { FC, useEffect, useState } from "react"
import { ProductId, BulkSchema } from "@/modules/entities"
import { assetProductMap } from "@/modules/assets"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION, SHEET_WHOLSALE_MARKET_BULK_DISCLOSURE } from "@/app/constants"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/redux/hooks"
import { useDisclosure } from "react-use-disclosure"
import { setWholesaleMarketBulkSheet } from "@/redux"
import { envConfig } from "@/env"
import { ChainKey } from "@/modules/blockchain"

interface BulkCardProps {
    bulk: BulkSchema
}
    
export const BulkCard: FC<BulkCardProps> = ({ bulk }) => {
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(QUERY_STATIC_SWR_MUTATION)
    const [images, setImages] = useState<Array<string>>([])
    useEffect(() => {
        const assetImageUrls = bulk.products.map((product) => {
            const _product = staticSwr.data?.data.products.find((pproduct) => pproduct.id === product.productId)
            return assetProductMap[_product?.displayId as ProductId].base.assetUrl
        })
        setImages(assetImageUrls)
    }, [staticSwr.data])
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(SHEET_WHOLSALE_MARKET_BULK_DISCLOSURE)
    const dispatch = useAppDispatch()
    const network = envConfig().network
    if (!staticSwr.data?.data.tokens) return null
    return (
        <Card pressable onClick={
            () => {
                dispatch(setWholesaleMarketBulkSheet({ bulkId: bulk.id }))
                open()
            }
        }>
            <CardHeader>
                <div className="flex items-center -gap-4">
                    {images.slice(0, 3).map((image, index) => {
                        if (index === 2 && images.length > 3) {
                            // Hiển thị dấu "..." nếu có nhiều hơn 5 ảnh
                            return (
                                <div
                                    className={cn(
                                        "bg-content-2 rounded-full w-14 h-14",
                                        "rounded-full -ml-4",
                                        "grid place-items-center",
                                        "relative font-semibold text-center"
                                    )}
                                    key="more"
                                >
                    +{images.length - 2}
                                </div>
                            )
                        }

                        return (
                            <div
                                className={cn(
                                    "bg-content-2 rounded-full w-14 h-14",
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
                <Spacer y={2}/>
                <div className="text-lg">{bulk.bulkName}</div>
                <div className="flex items-center gap-1 text-secondary">
                    <TokenIcon tokenKey={bulk.tokenKey} chainKey={ChainKey.Solana} network={network} tokens={staticSwr.data?.data.tokens} />
                    <div>
                        {bulk.maxPaidAmount}
                    </div>
                </div>
            </CardHeader>
            <CardBody className="w-full flex-col">
                <div className="text-sm text-muted-foreground">
                    {bulk.description}
                </div>
            </CardBody>
        </Card>
    )
}
