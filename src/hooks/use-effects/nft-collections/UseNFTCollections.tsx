import React from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { valuesWithKey } from "@/modules/common"
import { CollectionComponent } from "./Component"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"

export const UseNFTCollections = () => {
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        QUERY_STATIC_SWR_MUTATION
    )
    const nftCollectionsArray = valuesWithKey(staticSwr.data?.data.nftCollections || {})
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