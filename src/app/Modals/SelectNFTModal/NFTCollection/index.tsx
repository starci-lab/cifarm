import { Card, CardContent, CardTitle, Image, Spacer } from "@/components"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { NFT } from "./NFT"
import { NFTSkeleton } from "./NFTSkeleton"
interface NFTCollectionProps {
  collectionKey: string;
}

export const NFTCollection: FC<NFTCollectionProps> = ({ collectionKey }) => {
    const collectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionsSwrs
    )
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const collection = collections[collectionKey]
    const collectionSwr = collectionSwrs[collectionKey]

    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex items-center gap-2">
                    <Image src={collection.imageUrl} className="w-6 h-6" />
                    <CardTitle className="text-normal">{collection.name}</CardTitle>
                </div>
                <Spacer y={4} />
                <div className="grid gap-4">
                    {
                        collectionSwr.isLoading ? <>
                            <NFTSkeleton />
                            <NFTSkeleton />
                        </> :
                            collectionSwr.data?.nfts.map((nft) => (
                                <NFT key={nft.nftAddress} nft={{ ...nft, collectionKey }} />
                            ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}
