import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { NFTCollection } from "@/components"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { valuesWithKey } from "@/modules/common"
import { envConfig } from "@/env"
export const NFTCollectionsTab: FC = () => {
    const { swr: staticData } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const nftCollections = valuesWithKey(
        staticData.data?.data.nftCollections || {}
    )
    const collectionSwrs = useAppSelector(
        (state) => state.sessionReducer.nftCollectionSwrs
    )
    const chainKey = useAppSelector(
        (state) => state.sessionReducer.chainKey
    )
    const network = envConfig().network
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {nftCollections.map((collection) => {
                const collectionSwr = collectionSwrs[collection.key]
                if (!collection || !collectionSwr) return null
                const collectionData = collection[chainKey]?.[network]
                if (!collectionData) return null
                return (
                    <NFTCollection
                        key={collection.key}
                        collection={collectionData}
                        collectionSwr={collectionSwr}
                        onClick={() => {
                            // dispatch(setCollectionKey(collection.key))
                            // router.push(pathConstants.collection)
                        }}
                    />
                )
            })}
        </div>
    )
}
