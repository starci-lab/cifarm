"use client"
import { Header, Spacer, PreviewImage, NFTRarityBadge, WrappedBadge, Skeleton, Title, AttributeCard } from "@/components"
import React, { useEffect } from "react"
import { useAppSelector } from "@/redux"
import { useParams } from "next/navigation"
import { pathConstants } from "@/constants"
import { useGraphQLQueryStaticSwr, useRouterWithSearchParams } from "@/hooks"
import { NFTType, PlacedItemType } from "@/modules/entities"
import { AttributeName, FruitPropertiesName, fruitPropertiesNameMap, NFTRarityEnum, StatsAttributeName, statsAttributeNameMap } from "@/modules/blockchain"
import { useSingletonHook } from "@/modules/singleton-hook"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { envConfig } from "@/env"

const Page = () => {
    const params = useParams()
    const nftAddress = params.nftAddress as string
    const collectionKey = params.collectionKey as NFTType

    const router = useRouterWithSearchParams()

    useEffect(() => {
        if (!nftAddress || !collectionKey) {
            router.push(pathConstants.home)
        }
    }, [nftAddress, collectionKey])  

    const nftCollectionSwrs = useAppSelector((state) => state.sessionReducer.nftCollectionSwrs)
    const nftCollectionSwr = nftCollectionSwrs[collectionKey]
    const nft = nftCollectionSwr?.data?.nfts.find((nft) => nft.nftAddress === nftAddress)

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        QUERY_STATIC_SWR_MUTATION   
    )
    
    const collections = staticSwr.data?.data.nftCollections || {}

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = envConfig().network

    const renderProperties = () => {
        const collection = collections[collectionKey]
        const placedItemType = staticSwr.data?.data.placedItemTypes?.find(
            (placedItemType) => placedItemType.id === collection?.[chainKey]?.[network]?.placedItemTypeId
        )
        if (!placedItemType) {
            return null
        }   
        switch (placedItemType.type) {
        case PlacedItemType.Fruit:
            return (
                <div className="flex flex-wrap gap-2">
                    { Object.values(FruitPropertiesName).map((name) => {
                        return (
                            <AttributeCard
                                key={name}
                                title={fruitPropertiesNameMap[name].name}
                                tooltipString={fruitPropertiesNameMap[name].tooltip}
                                value={nft?.attributes.find(
                                    (attribute) => attribute.key === name
                                )?.value || ""}
                            />
                        )
                    })
                    }
                </div>
            )
        }
    }

    const renderStats = () => {
        const collection = collections[collectionKey]
        const placedItemType = staticSwr.data?.data.placedItemTypes?.find(
            (placedItemType) => placedItemType.id === collection?.[chainKey]?.[network]?.placedItemTypeId
        )
        if (!placedItemType) {
            return null
        }   
        switch (placedItemType.type) {
        case PlacedItemType.Fruit:
            return (
                <div className="flex flex-wrap gap-2">
                    { Object.values(StatsAttributeName).map((name) => {
                        return (
                            <AttributeCard
                                key={name}
                                title={statsAttributeNameMap[name].name}
                                tooltipString={statsAttributeNameMap[name].tooltip}
                                value={nft?.attributes.find(
                                    (attribute) => attribute.key === name
                                )?.value || ""}
                            />
                        )
                    })
                    }
                </div>
            )
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Header title={`${nft?.name}`} showBackButton={true} isSkeleton={!nftCollectionSwr?.data}/>
            </div>
            <Spacer y={6} />
            <PreviewImage imageUrl={nft?.image} />
            <Spacer y={4} />
            {
                nft ? (
                    <div className="flex gap-2 items-center">
                        <NFTRarityBadge
                            rarity={
                            nft.attributes.find(
                                (rarity) => rarity.key === AttributeName.Rarity
                            )?.value as NFTRarityEnum
                            }   
                        />
                        {
                            nft?.wrapped && (
                                <WrappedBadge />
                            )
                        }
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <Skeleton className="w-[60px] h-6"/>
                        <Skeleton className="w-[60px] h-6"/>
                    </div>
                )
            }
            <Spacer y={6} />
            <div>
                <Title title="Properties"/>
                <Spacer y={2} />
                {renderProperties()}
            </div>
            <Spacer y={6} />
            <div>
                <Title title="Stats"/>
                <Spacer y={2} />
                {renderStats()}
            </div>
        </div>
    )
}

export default Page
