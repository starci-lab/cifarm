
import React, { FC } from "react"
import { valuesWithKey } from "@/modules/common"
import { envConfig } from "@/env"
import { WrapperNFTCollection } from "./WrapperNFTCollection"
import { useAppSelector } from "@/redux"

export const NFTCollectionsTab: FC = () => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const nftCollections = valuesWithKey(
        staticData?.nftCollections || {}
    )
    const network = envConfig().network

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {nftCollections.map((nftCollection) => {
                    const collectionData = nftCollection?.[network]
                    if (!collectionData) return null
                    return (
                        <WrapperNFTCollection
                            collectionKey={nftCollection.key}
                            key={nftCollection.key}
                            collection={collectionData}
                        />
                    )
                })}
            </div>
        </div>
    )
}
