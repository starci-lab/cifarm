import { Card, CardBody, CardFooter, Image, Spacer } from "@/components"
import { BlockchainNFTData } from "@/modules/apollo"
import { NFTCollectionData } from "@/modules/entities"
import React, { FC } from "react"

interface NFTCollectionProps {
    collection: NFTCollectionData
    nfts: Array<BlockchainNFTData>
    onClick: () => void
    disabled?: boolean
}

export const NFTCollection: FC<NFTCollectionProps> = ({ collection, nfts, onClick, disabled }) => {
    return (
        <Card className="relative" onClick={onClick} pressable disabled={disabled}>
            <CardBody>
                <Image src={collection.imageUrl} className="w-24 h-24 object-contain" />
                <Spacer y={4}/>
                <div className="text-secondary text-xl leading-none">{collection.name}</div>
                <Spacer y={2}/>
                <div className="leading-none">{nfts.length}+ NFTs</div>
            </CardBody>
            <CardFooter>
                <div className="text-muted-foreground line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis velit minus, fuga, architecto accusantium placeat ab cupiditate soluta inventore aperiam assumenda quisquam numquam doloribus laborum optio. Corporis, earum atque. Consequatur!
                </div>
            </CardFooter>
        </Card>
    )
}
