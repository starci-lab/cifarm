import { Card, CardContent, Image, Spacer, ExtendedButton, NFTRarity } from "@/components"
import { TraitDropdown } from "./TraitDropdown"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { NFT_DISCLOSURE } from "@/app/constants"
import { useAppDispatch, setNFTModal, ExtendedNFTData } from "@/redux"
import { AttributeName, NFTRarityEnum } from "@/modules/blockchain"
import { ExtendedBadge } from "@/components"
import { SnowflakeIcon } from "lucide-react"

interface NFTProps {
    nft: ExtendedNFTData
}

export const NFT: FC<NFTProps> = ({ nft }) => {
    const { open } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFT_DISCLOSURE)
    const dispatch = useAppDispatch()
    return <Card>
        <CardContent className="p-3">
            <Image src={nft.imageUrl} className="w-full aspect-square object-contain" />
            <Spacer y={4} />
            <div className="text-sm">{nft.name}</div>
            <Spacer y={2} />
            <div className="flex gap-2">
                <NFTRarity rarity={nft.attributes.find(attribute => attribute.key === AttributeName.Rarity)?.value as NFTRarityEnum} />
                {
                    nft.frozen && <ExtendedBadge icon={<SnowflakeIcon className="w-[14px] h-[14px]" />}>Frozen</ExtendedBadge>
                }
            </div>
            <Spacer y={4} />
            <div className="flex gap-2 flex-col">
                <div className="flex gap-2 sm:flex-row flex-col">
                    <TraitDropdown traits={nft.attributes} />
                    <ExtendedButton variant="outline" className="w-full">
                View
                    </ExtendedButton>
                </div>
                <ExtendedButton variant="outline" className="w-full" onClick={() => {
                    dispatch(setNFTModal({ nftData: nft }))
                    open()
                }}>
                Manage
                </ExtendedButton>
            </div>
        </CardContent>
    </Card>
}   
