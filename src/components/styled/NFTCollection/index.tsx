import { Image, PressableCard, Separator, Spacer } from "@/components"
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
        <PressableCard className="relative" onClick={onClick}>
            <div className="grid place-items-start w-full">
                <Image src={collection.imageUrl} className="w-24 h-24 object-contain" />
                {/* <div className="flex gap-2 absolute left-3 bottom-3 bg-background/50 text-muted-background rounded-md px-2 py-1.5">
                    <div className="text-sm font-bold">{collection.name}</div>
                    <div className="text-sm text-muted-foreground font-bold">{collectionSwr.data?.nfts.length}</div>
                </div> */}
                <Spacer y={2}/>
                <div className="text-text text-lg">{collection.name}</div>
                <div className="text-text-secondary">{collectionSwr.data?.nfts.length} NFTs</div>
                <Separator className="w-full"/>
                <Spacer y={2}/>
                <div className="text-text-foreground line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis velit minus, fuga, architecto accusantium placeat ab cupiditate soluta inventore aperiam assumenda quisquam numquam doloribus laborum optio. Corporis, earum atque. Consequatur!
                </div>
            </div>        
        </PressableCard>
    )
}
