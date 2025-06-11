import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { valuesWithKey } from "@/modules/common"
import { envConfig } from "@/env"
import { WrapperNFTCollection } from "./WrapperNFTCollection"

export const NFTCollectionsTab: FC = () => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const nftCollections = valuesWithKey(
        staticSwr.data?.data.nftCollections || {}
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
