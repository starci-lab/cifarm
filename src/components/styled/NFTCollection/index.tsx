import { Image, PressableCard } from "@/components"
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
    console.log(collection)
    return (
        <PressableCard className="relative" onClick={onClick}>
            <div className="grid place-items-center p-3 w-full">
                <Image src={collection.imageUrl} className="w-40 h-40 object-contain" />
                <div className="flex gap-2 absolute left-3 bottom-3 bg-background/50 text-muted-background rounded-md px-2 py-1.5">
                    <div className="text-sm font-bold">{collection.name}</div>
                    <div className="text-sm text-muted-foreground font-bold">{collectionSwr.data?.nfts.length}</div>
                </div>
            </div>
        </PressableCard>
    )
}
