"use client"

import { SHEET_NFT_DISCLOSURE } from "@/app/constants"
import { PressableCard, Image, WrappedBadge, Spacer, NFTRarityBadge } from "@/components"
import { AttributeName, NFTData, NFTRarityEnum } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"
import { setNFTSheet, useAppDispatch } from "@/redux"
interface NFTCardProps {
    nft: NFTData
}

export const NFTCard: FC<NFTCardProps> = ({ nft }) => {
    const { open: openNFTSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_NFT_DISCLOSURE
    )

    
    const dispatch = useAppDispatch()
    return <PressableCard key={nft.nftAddress} className="relative" onClick={
        () => {
            dispatch(setNFTSheet({
                nftAddress: nft.nftAddress,
            })) 
            openNFTSheet()
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
