import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { NFTCollection } from "@/components"
import { useGraphQLQueryStaticSwr, useRouterWithSearchParams } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
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
    const nftCollectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionSwrs
    )
    const chainKey = useAppSelector(
        (state) => state.sessionReducer.chainKey
    )
    const network = envConfig().network

    const router = useRouterWithSearchParams()
    return (
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-4">
            {nftCollections.map((nftCollection) => {
                const collectionSwr = nftCollectionSwrs[nftCollection.key]
                if (!nftCollection || !collectionSwr) return null
                const collectionData = nftCollection[chainKey]?.[network]
                if (!collectionData) return null

                return (
                    <NFTCollection
                        key={nftCollection.key}
                        collection={collectionData}
                        collectionSwr={collectionSwr}
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
    )
}
