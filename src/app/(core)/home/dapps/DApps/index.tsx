"use client"
import { TokenIcon } from "@/components"
import React, { FC } from "react"
import { DAppCard } from "../DAppCard"
import { useSingletonHook } from "@/singleton"
import { assetIconMap, AssetIconId } from "@/modules/assets"
import { useDisclosure } from "react-use-disclosure"
import { TokenKey } from "@/types"
import { useRouterWithSearchParams } from "@/hooks"
import { PURCHASE_NFT_BOXES_MODAL_DISCLOSURE } from "@/singleton"
import { ChainKey } from "@/modules/blockchain"
import { envConfig } from "@/env"
import { useAppSelector } from "@/redux"

export const DApps: FC = () => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const { open: openPurchaseNFTBoxesModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        PURCHASE_NFT_BOXES_MODAL_DISCLOSURE
    )
    const network = envConfig().network     
    const router = useRouterWithSearchParams()
    if (!staticData?.tokens) return null
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DAppCard
                title="NFT Box"
                description="Get your NFT Box and begin collecting unique digital assets."
                content={
                    <div className="flex items-center gap-1">
                        <TokenIcon
                            tokenKey={
                                staticData?.nftBoxInfo.tokenKey ||
                                TokenKey.Native
                            }
                            chainKey={ChainKey.Solana}
                            network={network}
                            tokens={staticData?.tokens}
                        />
                        <div>
                            {staticData?.nftBoxInfo.boxPrice}
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