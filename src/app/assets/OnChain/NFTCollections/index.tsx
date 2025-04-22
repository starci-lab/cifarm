import { Title, Spacer, ExtendedButton, NFTCollection } from "@/components"
import { setCollectionKey, useAppDispatch, useAppSelector } from "@/redux"
import React, { FC } from "react"
import { useRouterWithSearchParams } from "@/hooks"
import { Settings2Icon } from "lucide-react"
import { pathConstants } from "@/constants"
import { valuesWithKey } from "@/modules/common"

export const NFTCollections: FC = () => {
    const collections = useAppSelector((state) => state.sessionReducer.nftCollections)
    const collectionSwrs = useAppSelector((state) => state.sessionReducer.nftCollectionSwrs)
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    const collectionsArray = valuesWithKey(collections)
    const enabledCollectionsArray = collectionsArray.filter((collection) => collection.enabled)
    if (!collections) {
        return null
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <Title
                    title="NFT Collections"
                    tooltipString="The NFT collections you have added to your wallet."
                />
                <ExtendedButton
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push(pathConstants.manageNFTCollections)}
                >
                    <Settings2Icon className="w-5 h-5" />
                </ExtendedButton>
            </div>
            <Spacer y={4} />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {enabledCollectionsArray.map((collection) => {
                    const collectionSwr = collectionSwrs[collection.key]
                    if (!collection || !collectionSwr) return null
                    return (
                        <NFTCollection 
                            key={collection.key} 
                            collection={collection}
                            collectionSwr={collectionSwr}
                            onClick={() => {
                                dispatch(setCollectionKey(collection.key))
                                router.push(pathConstants.collection)
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
