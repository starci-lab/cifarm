import React, { FC } from "react"
import { NFTCollection } from "@/components"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { NFTCollectionData, NFTCollectionKey } from "@/modules/entities"

interface WrapperNFTCollectionProps {
    collection: NFTCollectionData
    disabled?: boolean
    collectionKey: NFTCollectionKey
}

export const WrapperNFTCollection: FC<WrapperNFTCollectionProps> = ({ 
    collection, 
    disabled,
    collectionKey
}) => {
    const router = useRouterWithSearchParams()
    // wont process if not authenticated
    return (
        <NFTCollection
            onClick={() => {
                // set the nft collection swr
                // navigate to the collection page
                router.push(
                    `${pathConstants.collections}/${collectionKey}`, 
                )
            }}
            collection={collection}
            disabled={disabled}
        />
    )
}