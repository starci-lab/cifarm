"use client"

import { PressableCard, Image, WrappedBadge, Spacer, NFTRarityBadge } from "@/components"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { AttributeName, NFTData, NFTRarityEnum } from "@/modules/blockchain"
import React, { FC } from "react"

interface NFTCardProps {
    nft: NFTData
}

export const NFTCard: FC<NFTCardProps> = ({ nft }) => {
    const router = useRouterWithSearchParams()
    return <PressableCard key={nft.nftAddress} className="relative" onClick={
        () => {
            router.push(`${nft.nftAddress}`, {
                mergeWithCurrentPath: true,
            })
        }
    }>
        <div className="grid place-items-center p-3 w-full">
            <Image   
                src={nft.image}
                className="w-40 h-40 object-contain"
            />
            <div className="top-3 left-3 absolute">
                <NFTRarityBadge
                    rarity={
                            nft.attributes.find(
                                (rarity) => rarity.key === AttributeName.Rarity
                            )?.value as NFTRarityEnum
                    }   
                />
            </div>
            <div className="flex gap-2 absolute left-3 bottom-3 bg-background/50 text-muted-background rounded-md px-2 py-1.5">
                <div>
                    <div className="font-bold">{nft.name}</div>
                    {
                        nft.wrapped && (
                            <>
                                <Spacer y={1}/>
                                <WrappedBadge />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    </PressableCard>    
}
