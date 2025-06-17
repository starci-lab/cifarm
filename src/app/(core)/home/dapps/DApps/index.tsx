"use client"
import { TokenIcon } from "@/components"
import React, { FC } from "react"
import { DAppCard } from "../DAppCard"
import { useSingletonHook } from "@/singleton"
import { assetIconMap, AssetIconId } from "@/modules/assets"
import { useDisclosure } from "react-use-disclosure"
import { TokenKey } from "@/modules/entities"
import { useGraphQLQueryStaticSwr, useRouterWithSearchParams } from "@/hooks"
import { PURCHASE_NFT_BOXES_DISCLOSURE, QUERY_STATIC_SWR_MUTATION } from "@/app/(core)/constantsd"
import { ChainKey } from "@/modules/blockchain"
import { envConfig } from "@/env"

export const DApps: FC = () => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const { open: openPurchaseNFTBoxesModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        PURCHASE_NFT_BOXES_DISCLOSURE
    )
    const network = envConfig().network     
    const router = useRouterWithSearchParams()
    if (!staticSwr.data?.data.tokens) return null
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DAppCard
                title="NFT Box"
                description="Get your NFT Box and begin collecting unique digital assets."
                content={
                    <div className="flex items-center gap-1">
                        <TokenIcon
                            tokenKey={
                                staticSwr.data?.data.nftBoxInfo.tokenKey ||
                                TokenKey.Native
                            }
                            chainKey={ChainKey.Solana}
                            network={network}
                            tokens={staticSwr.data?.data.tokens}
                        />
                        <div>
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
                requireConnectWallet={false}
                title="Wholesale Market"
                description="Trade goods in bulk and earn tokens for each successful delivery."
                imageUrl={assetIconMap[AssetIconId.WholesaleMarket].base.assetUrl}
                onClick={() => {
                    router.push("/home/dapps/wholesale-market")
                }}
            />
            <DAppCard
                requireConnectWallet={false}
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
        </div>
    )
}