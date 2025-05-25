"use client"
import { ExtendedButton, FilterBar, Header, Spacer } from "@/components"
import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch, setIsConverting, setNFTAddresses, setNFTType } from "@/redux"
import { useParams } from "next/navigation"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { CONVERT_NFT_DISCLOSURE, GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { NFTType } from "@/modules/entities"
import { envConfig } from "@/env"
import { NFTCard } from "./NFTCard"
import { NFTCardSkeleton } from "./NFTCardSkeleton"
import { useMediaQuery } from "usehooks-ts"
import { ArrowsClockwise, Swap } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { useDisclosure } from "react-use-disclosure"
const Page = () => {
    const params = useParams()
    const collectionKey = params.collectionKey as NFTType
    const network = envConfig().network

    const router = useRouterWithSearchParams()

    const isConverting = useAppSelector((state) => state.convertReducer.isConverting)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!collectionKey) {
            router.push(pathConstants.home)
        }
    }, [collectionKey])  

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
    >(GRAPHQL_QUERY_STATIC_SWR)

    const collection = staticSwr?.data?.data.nftCollections[collectionKey]?.[network]
    const nftCollectionSwrs = useAppSelector((state) => state.sessionReducer.nftCollectionSwrs)
    const nftCollectionSwr = nftCollectionSwrs[collectionKey]
    const nftAddresses = useAppSelector((state) => state.convertReducer.nftAddresses)
    const isSmallScreen = useMediaQuery("(max-width: 640px)")
    const conversionRate = staticSwr.data?.data.nftConversion.conversionRate || 1
    const isConvertDisabled = nftAddresses.length === 0 || nftAddresses.length % conversionRate !== 0
    const { open: openConvertNFTModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        CONVERT_NFT_DISCLOSURE
    )

    useEffect(() => {
        return () => {
            dispatch(setNFTAddresses([]))
            dispatch(setIsConverting(false))
        }
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Header showBackButton={true} isSkeleton={!nftCollectionSwr?.data} title={`${collection?.name}`}/>
            </div>
            <Spacer y={6} />
            <div className="flex justify-between items-center gap-4">
                <div className="flex gap-2 items-center">
                    {isConverting && (
                        <div className="flex gap-4 items-center">
                            <div className="flex gap-2 items-center">
                                <ExtendedButton color="secondary" variant="flat" onClick={() => dispatch(setIsConverting(false))}>
                                Cancel
                                </ExtendedButton>
                                <ExtendedButton color="primary" disabled={isConvertDisabled} onClick={() => {
                                    openConvertNFTModal()
                                }}>
                                Done
                                </ExtendedButton>
                            </div>
                            <div className={cn({
                                "text-destructive": isConvertDisabled
                            })}>
                                {`${nftAddresses.length}/${conversionRate} NFTs selected`}
                            </div>
                        </div>
                    )
                    }
                    {
                        !isConverting && (
                            <ExtendedButton color="secondary" variant="flat" onClick={() => {
                                dispatch(setNFTAddresses([]))
                                dispatch(setNFTType(collectionKey))
                                dispatch(setIsConverting(true))
                            }}>
                                <Swap />
                            Convert
                            </ExtendedButton>
                        )}
                </div>
                <div className="flex gap-2 items-center">
                    <FilterBar
                        onSearchStringChange={() => {}}
                        searchString={""}
                        className="max-w-[200px]"
                    />
                    <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => nftCollectionSwr.mutate()}>
                        <ArrowsClockwise />
                    </ExtendedButton>
                </div>
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
