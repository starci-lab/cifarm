import { Card, CardBody, Image, Separator, Spacer } from "@/components"
import { CollectionResponse } from "@/modules/blockchain"
import { NFTCollectionData } from "@/modules/entities"
import React, { FC } from "react"
import { SWRResponse } from "swr"

interface NFTCollectionProps {
    collectionSwr: SWRResponse<CollectionResponse>
    onClick: () => void
    collection: NFTCollectionData
}

export const NFTCollection: FC<NFTCollectionProps> = ({ collection, collectionSwr, onClick }) => {
    return (
        <Card className="relative" onClick={onClick} pressable>
            <CardBody className="pb-2">
                <Image src={collection.imageUrl} className="w-24 h-24 object-contain" />
                <Spacer y={2}/>
                <div className="text-foreground text-lg">{collection.name}</div>
                <div className="text-secondary">{collectionSwr.data?.nfts.length} NFTs</div>
            </CardBody>
            <Separator className="w-full"/>
            <CardBody className="pt-2">
                <div className="text-text-foreground line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis velit minus, fuga, architecto accusantium placeat ab cupiditate soluta inventore aperiam assumenda quisquam numquam doloribus laborum optio. Corporis, earum atque. Consequatur!
                </div>
            </CardBody>
        </Card>
    )
}
