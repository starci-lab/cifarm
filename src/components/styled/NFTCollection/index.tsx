import { Card, CardBody, CardFooter, Image, Spacer } from "@/components"
import { CollectionResponse } from "@/modules/blockchain"
import { NFTCollectionData } from "@/modules/entities"
import React, { FC } from "react"
import { SWRResponse } from "swr"

interface NFTCollectionProps {
    collectionSwr: SWRResponse<CollectionResponse>
    onClick: () => void
    collection: NFTCollectionData
    disabled?: boolean
}

export const NFTCollection: FC<NFTCollectionProps> = ({ collection, collectionSwr, onClick, disabled }) => {
    return (
        <Card className="relative" onClick={onClick} pressable disabled={disabled}>
            <CardBody>
                <Image src={collection.imageUrl} className="w-24 h-24 object-contain" />
                <Spacer y={4}/>
                <div className="text-secondary text-xl leading-none">{collection.name}</div>
                <Spacer y={2}/>
                <div className="leading-none">{collectionSwr.data?.nfts.length} NFTs</div>
            </CardBody>
            <CardFooter>
                <div className="text-muted-foreground line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis velit minus, fuga, architecto accusantium placeat ab cupiditate soluta inventore aperiam assumenda quisquam numquam doloribus laborum optio. Corporis, earum atque. Consequatur!
                </div>
            </CardFooter>
        </Card>
    )
}
