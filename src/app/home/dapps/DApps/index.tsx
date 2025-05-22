"use client"
import { PaymentIcon } from "@/components"
import React, { FC } from "react"
import { DAppCard } from "../DAppCard"
import { useSingletonHook } from "@/modules/singleton-hook"
import { assetIconMap, AssetIconId } from "@/modules/assets"
import { useDisclosure } from "react-use-disclosure"
import { PaymentKind } from "@/modules/entities"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { SHEET_WHOLSALE_MARKET_DISCLOSURE, PURCHASE_NFT_BOXES_DISCLOSURE, QUERY_STATIC_SWR_MUTATION } from "@/app/constants"

export const DApps: FC = () => {
    const { open: openWholesaleMarketSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_WHOLSALE_MARKET_DISCLOSURE
    )
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const { open: openPurchaseNFTBoxesModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        PURCHASE_NFT_BOXES_DISCLOSURE
    )
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DAppCard
                title="NFT Box"
                description="Get your NFT Box and begin collecting unique digital assets."
                content={
                    <div className="flex items-center gap-1">
                        <PaymentIcon
                            paymentKind={
                                staticSwr.data?.data.nftBoxInfo.paymentKind ||
                    PaymentKind.Token
                            }
                            className="w-5 h-5"
                        />
                        <div className="text-secondary">
                            {staticSwr.data?.data.nftBoxInfo.boxPrice}
                        </div>
                    </div>
                }
                imageUrl={assetIconMap[AssetIconId.NFTBox].base.assetUrl}
                onClick={async () => {
                    openPurchaseNFTBoxesModal()
                }
                }
            />
            <DAppCard
                title="Wholesale Market"
                description="Trade goods in bulk and earn tokens for each successful delivery."
                imageUrl={assetIconMap[AssetIconId.WholesaleMarket].base.assetUrl}
                onClick={openWholesaleMarketSheet}
            />
            <DAppCard
                title="NFT Marketplace"
                description="Trade NFTs with other players."
                imageUrl={assetIconMap[AssetIconId.NFTMarketplace].base.assetUrl}
                onClick={() => {}}
                content={
                    <div className="text-secondary">
                        Coming soon
                    </div>
                }
            />
            <DAppCard
                title="$CIFARM Staking"
                description="Stake $CIFARM to earn rewards."
                imageUrl={""}
                onClick={() => {}}
                content={
                    <div className="text-secondary">
                        Coming soon
                    </div>
                }
            />
        </div>
    )
}