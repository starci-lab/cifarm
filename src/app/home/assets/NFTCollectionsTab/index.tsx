import { GRAPHQL_QUERY_BLOCKCHAIN_COLLECTIONS_SWR, QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { NFTCollection } from "@/components"
import { useGraphQLQueryBlockchainCollectionsSwr, useGraphQLQueryStaticSwr, useRouterWithSearchParams } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC } from "react"
import { valuesWithKey } from "@/modules/common"
import { envConfig } from "@/env"
import { pathConstants } from "@/constants"

export const NFTCollectionsTab: FC = () => {
    const { swr: staticData } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const nftCollections = valuesWithKey(
        staticData.data?.data.nftCollections || {}
    )
    const { swr: blockchainCollections } = useSingletonHook<ReturnType<typeof useGraphQLQueryBlockchainCollectionsSwr>>(GRAPHQL_QUERY_BLOCKCHAIN_COLLECTIONS_SWR)
    const network = envConfig().network

    const router = useRouterWithSearchParams()
    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {nftCollections.map((nftCollection) => {
                    const collectionData = nftCollection?.[network]
                    if (!collectionData) return null

                    return (
                        <NFTCollection
                            key={nftCollection.key}
                            collection={collectionData}
                            nfts={blockchainCollections.data?.data.blockchainCollections.collections.find((collection) => collection.nftType === nftCollection.key)?.nfts ?? []}
                            onClick={() => {
                                router.push(
                                    `${pathConstants.collections}/${nftCollection.key}`, 
                                    {
                                        mergeWithCurrentPath: true,
                                    }
                                )
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
