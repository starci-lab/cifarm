import { Image, PressableCard } from "@/components"
import React, { FC } from "react"
// import { ExtendedNFTData } from "@/redux"

interface NFTProps {
    // nft: ExtendedNFTData
    nft: {
        name: string
        image: string
        traits: string[]
    }
}

export const NFT: FC<NFTProps> = ({ nft }) => {
    return <PressableCard className="relative">
        <div className="grid place-items-center p-3 w-full">
            <Image src="" className="w-40 h-40 object-contain" />
            <div className="flex gap-2 absolute left-3 bottom-3 bg-background/50 text-muted-background rounded-md px-2 py-1.5">
                <div className="text-sm font-bold">{nft.name}</div>
            </div>
        </div>
    </PressableCard>
}   
