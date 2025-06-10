"use client"

import { SHEET_NFT_DISCLOSURE } from "@/app/constants"
import { Image, WrappedBadge, Spacer, NFTRarityBadge, Card, CardBody, CardFooter } from "@/components"
import { AttributeName, NFTRarityEnum } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"
import { setNFTSheet, useAppSelector, useAppDispatch, setNFTAddresses } from "@/redux"
import { cn } from "@/lib/utils"
import { BlockchainNFTData } from "@/modules/apollo"

interface NFTCardProps {
    nft: BlockchainNFTData
}

export const NFTCard: FC<NFTCardProps> = ({ nft }) => {
    const { open: openNFTSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_NFT_DISCLOSURE
    )
    const isConverting = useAppSelector((state) => state.convertReducer.isConverting)
    const nftAddresses = useAppSelector((state) => state.convertReducer.nftAddresses)
    const dispatch = useAppDispatch()
    const isSelected = nftAddresses.includes(nft.nftAddress)    
    return (
        <Card pressable className={cn("flex-1 p-0 overflow-hidden relative", {
            "bg-secondary transition-transform transform scale-105 duration-300 ease-in-out shadow-lg": isSelected && isConverting
        })} onClick={
            () => {
                if (isConverting) {
                    if (isSelected) {
                        dispatch(setNFTAddresses(nftAddresses.filter((address) => address !== nft.nftAddress)))
                    } else {
                        dispatch(setNFTAddresses([...nftAddresses, nft.nftAddress]))
                    }
                    return
                }
                dispatch(setNFTSheet({
                    nftAddress: nft.nftAddress,
                })) 
                openNFTSheet()
            }
        }>
            <CardBody>
                <div className="flex flex-col gap-2 absolute top-4 right-4">
                    <NFTRarityBadge
                        rarity={
                            nft.traits.find(
                                (rarity) => rarity.key === AttributeName.Rarity
                            )?.value as NFTRarityEnum
                        }   
                    />
                    {
                        nft.wrapped && (
                            <WrappedBadge />
                        )
                    }
                </div>
                <Image   
                    src={nft.imageUrl}
                    className="w-24 h-24 object-contain"
                />
                <Spacer y={4}/>
                <div className="text-xl text-secondary leading-none">{nft.name}</div>
            </CardBody>
            <CardFooter>
                <div className="text-muted-foreground">
                    {nft.description || "No description"}
                </div>
            </CardFooter>
        </Card>   
    )
}
