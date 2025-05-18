"use client"
import { ExtendedButton, FilterBar, Header, Spacer } from "@/components"
import React, { useEffect } from "react"
import { useAppSelector } from "@/redux"
import { useParams } from "next/navigation"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { NFTType } from "@/modules/entities"
import { envConfig } from "@/env"
import { NFTCard } from "./NFTCard"
import { NFTCardSkeleton } from "./NFTCardSkeleton"
import { useMediaQuery } from "usehooks-ts"
import { ArrowsClockwise } from "@phosphor-icons/react"
const Page = () => {
    const params = useParams()
    const collectionKey = params.collectionKey as NFTType
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = envConfig().network

    const router = useRouterWithSearchParams()

    useEffect(() => {
        if (!collectionKey) {
            router.push(pathConstants.home)
        }
    }, [collectionKey])  

    if (!collectionKey) {
        return null
    }

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
    >(GRAPHQL_QUERY_STATIC_SWR)

    const collection = staticSwr?.data?.data.nftCollections[collectionKey]?.[chainKey]?.[network]
    const nftCollectionSwrs = useAppSelector((state) => state.sessionReducer.nftCollectionSwrs)
    const nftCollectionSwr = nftCollectionSwrs[collectionKey]

    const isSmallScreen = useMediaQuery("(max-width: 640px)")
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Header showBackButton={true} isSkeleton={!nftCollectionSwr?.data} title={`${collection?.name}`}/>
            </div>
            <Spacer y={6} />
            <div className="flex gap-4 items-center">
                <FilterBar
                    onSearchStringChange={() => {}}
                    searchString={""}
                    className="max-w-[200px]"
                />
                <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => nftCollectionSwr.mutate()}>
                    <ArrowsClockwise />
                </ExtendedButton>
            </div>
            <Spacer y={4} />
            {   
                (!collection || !nftCollectionSwr || !nftCollectionSwr.data) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {
                            isSmallScreen ? (
                                <NFTCardSkeleton />
                            ) : (
                                <>
                                    <NFTCardSkeleton />
                                    <NFTCardSkeleton />
                                    <NFTCardSkeleton />
                                    <NFTCardSkeleton />
                                </>
                            )
                        }
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {nftCollectionSwr.data?.nfts.map((nft) => {
                            if (!staticSwr.data) {
                                throw new Error("No data")
                            }
                            return (
                                <NFTCard key={nft.nftAddress} nft={nft} />
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default Page
