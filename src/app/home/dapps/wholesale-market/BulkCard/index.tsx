"use client"

import { Card, CardBody, CardHeader, ScaledImage, Spacer, Image, Badge, Tooltip, TooltipTrigger, TooltipContent } from "@/components"
import { TokenIcon } from "@/components"
import React, { FC, useEffect, useState } from "react"
import { ProductId, BulkSchema, computePaidAmount } from "@/modules/entities"
import { assetProductMap, assetIconMap, AssetIconId } from "@/modules/assets"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { GRAPHQL_QUERY_VAULT_CURRENT_SWR, QUERY_STATIC_SWR_MUTATION, SHEET_WHOLSALE_MARKET_BULK_DISCLOSURE } from "@/app/constants"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/redux/hooks"
import { useDisclosure } from "react-use-disclosure"
import { setWholesaleMarketBulkSheet } from "@/redux"
import { envConfig } from "@/env"
import { ChainKey } from "@/modules/blockchain"
import { Plus } from "@phosphor-icons/react"
import { useGraphQLQueryVaultCurrentSwr } from "@/hooks"
import { getPercentageString } from "@/modules/common"

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
    const { swr: vaultSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryVaultCurrentSwr>>(GRAPHQL_QUERY_VAULT_CURRENT_SWR)
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
                <div className="flex items-center gap-2">
                    <div className="text-lg">{bulk.bulkName}</div>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge>
                                {getPercentageString(bulk.maxPaidPercentage)}
                            </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            We will pay you {getPercentageString(bulk.maxPaidPercentage)} of the vault’s value, up to a maximum of {bulk.maxPaidAmount}.
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Spacer y={2}/>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <TokenIcon tokenKey={bulk.tokenKey} chainKey={ChainKey.Solana} network={network} tokens={staticSwr.data?.data.tokens} />
                        <div>
                            {(() => {
                                const vaultData = vaultSwr.data?.data.vaultCurrent.data.find((vault) => vault.tokenKey === bulk.tokenKey)
                                if (!vaultData) return null   
                                return computePaidAmount({
                                    bulk,
                                    vaultData
                                })
                            })()}
                        </div>
                    </div>
                    <Plus className="w-4 h-4"/>
                    <div className="flex items-center gap-1">
                        <Image src={assetIconMap[AssetIconId.TCIFARM].base.assetUrl} alt="CIFARM" className="w-6 h-6" />
                        <div>
                            {bulk.tCIFARM}
                        </div>
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
