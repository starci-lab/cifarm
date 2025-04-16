import React from "react"
import { useAppSelector } from "@/redux"
import { valuesWithKey } from "@/modules/common"
import { CollectionComponent } from "./Component"

export const UseNFTCollections = () => {
    const nftCollections = useAppSelector((state) => state.sessionReducer.nftCollections)
    const nftCollectionsArray = valuesWithKey(nftCollections)
    return (
        <>
            {nftCollectionsArray.map((nftCollection) => (
                <CollectionComponent
                    key={nftCollection.key}
                    collectionKey={nftCollection.key}
                />
            ))}
        </>
    )
}