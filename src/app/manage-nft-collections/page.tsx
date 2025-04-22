"use client"
import {
    Button,
    Container,
    FilterBar,
    Header,
    NFTCollection,
    Spacer,
    Title,
} from "@/components"
import React, { FC } from "react"
import { PlusIcon, RotateCcwIcon } from "lucide-react"
import { valuesWithKey } from "@/modules/common"
import { setCollectionKey, useAppDispatch, useAppSelector } from "@/redux"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"

const Page: FC = () => {
    const nftCollections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const nftCollectionsArray = valuesWithKey(nftCollections)
    const selectedNFTCollectionsArray = nftCollectionsArray.filter(
        (nftCollection) => nftCollection.enabled
    )
    const availableNFTCollectionsArray = nftCollectionsArray.filter(
        (nftCollection) => !nftCollection.enabled
    )
    const nftCollectionsSwr = useAppSelector(
        (state) => state.sessionReducer.nftCollectionSwrs
    )
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    return (
        <Container hasPadding>
            <div>
                <Header title="Manage NFT Collections" />
                <Spacer y={6} />
                <FilterBar handleSearchResult={() => {}} />
                <Spacer y={4} />
                <div>
                    <div className="flex justify-between w-full items-center">
                        <Title
                            title="Selected Collections"
                            tooltipString="Selected collections will be displayed in the wallet"
                        />
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                                <PlusIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <RotateCcwIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <Spacer y={4} />
                    {selectedNFTCollectionsArray.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                            {selectedNFTCollectionsArray.map((nftCollection) => {
                                return (
                                    <NFTCollection
                                        key={nftCollection.key}
                                        collection={nftCollection}
                                        collectionSwr={nftCollectionsSwr[nftCollection.key]}
                                        onClick={() => {
                                            dispatch(setCollectionKey(nftCollection.key))
                                            router.push(pathConstants.collection)
                                        }}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-muted-foreground">No record found.</div>
                    )}
                </div>
                <Spacer y={6} />
                <div>
                    <Title
                        title="Available Collections"
                        tooltipString="Available collections will not display in the list, but you can add them anytime."
                    />
                    <Spacer y={4} />
                    {availableNFTCollectionsArray.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                            {availableNFTCollectionsArray.map((nftCollection) => {
                                return (
                                    <NFTCollection
                                        key={nftCollection.key}
                                        collection={nftCollection}
                                        collectionSwr={nftCollectionsSwr[nftCollection.key]}
                                        onClick={() => {
                                            dispatch(setCollectionKey(nftCollection.key))
                                            router.push(pathConstants.collection)
                                        }}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-muted-foreground">No record found.</div>
                    )}
                </div>
            </div>
        </Container>
    )
}
export default Page
