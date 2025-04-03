import { Card, CardContent, Image, Spacer } from "@/components"
import { NFTData } from "@/modules/blockchain"
import React, { FC } from "react"

interface NFTProps {
    nft: NFTData
}

export const NFT: FC<NFTProps> = ({ nft }) => {
    return <Card>
        <CardContent className="p-3">
            <Image src={nft.imageUrl} className="w-10 h-10" />
            <Spacer y={4} />
            <div className="text-sm text-gray-500">{nft.name}</div>
            <Spacer y={4} />
            <div className="text-sm text-gray-500">{nft.traits.map((trait) => trait.key).join(", ")}</div>
        </CardContent>
    </Card>
}   
