import React, { FC, useEffect, useState } from "react"
import { PlacedItemSchema, PlacedItemType } from "@/modules/entities"
import { fruitAssetMap, TextureConfig } from "@/game/assets"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { NFT_STORAGE_DISCLOSURE, QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { Image, PressableCard } from "@/components"
import {
    ExternalEventEmitter,
    ExternalEventName,
    getBlobUrlByKey,
    ModalName,
    PlaceNFTItemMessage,
} from "@/game"
import useSWR from "swr"
import { useAppSelector } from "@/redux"
import { useDisclosure } from "react-use-disclosure"
export interface NFTCardProps {
  placedItem: PlacedItemSchema;
}

export const NFTCard: FC<NFTCardProps> = ({ placedItem }) => {
    const [textureConfig, setTextureConfig] = useState<TextureConfig | undefined>(
        undefined
    )
    const {
        swr: { data },
    } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        QUERY_STATIC_SWR_MUTATION
    )
    const { close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NFT_STORAGE_DISCLOSURE)

    useEffect(() => {
        if (!data) return
        const placedItemType = data.data.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) throw new Error("Placed item type not found")
        switch (placedItemType.type) {
        case PlacedItemType.Fruit: {
            const fruit = data.data.fruits.find(
                (fruit) => fruit.id === placedItemType.fruit
            )
            if (!fruit) throw new Error("Fruit not found")
            if (!fruit.displayId) throw new Error("Fruit display id not found")
            const _textureConfig =
          fruitAssetMap[fruit.displayId]?.nft?.[
              placedItem.fruitInfo?.currentStage ?? 0
          ].textureConfig
            if (!_textureConfig) throw new Error("Texture config not found")
            setTextureConfig(_textureConfig)
            break
        }
        default:
            throw new Error("Placed item type not found")
        }
    }, [data])

    const { data: blobUrl } = useSWR(
        textureConfig ? textureConfig.key : null,
        async () => {
            if (!textureConfig) {
                throw new Error("Texture config not found")
            }
            const blobUrl = await getBlobUrlByKey(textureConfig)
            return blobUrl
        }
    )
    const collections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )

    if (!textureConfig) return null
    const collection = Object.values(collections).find(
        (collection) =>
            collection.collectionAddress === placedItem.nftMetadata?.collectionAddress
    )
    return (
        <PressableCard
            showBorder={false}
            onClick={() => {
                close()
                ExternalEventEmitter.emit(ExternalEventName.CloseExternalModal, {
                    modalName: ModalName.NFTStorage,
                })
                const eventMessage: PlaceNFTItemMessage = {
                    placedItem,
                }
                ExternalEventEmitter.emit(ExternalEventName.PlaceNFTItem, eventMessage)
            }}
        >
            <div className="flex gap-2">
                <Image
                    className="w-16 aspect-square object-contain"
                    src={blobUrl ?? ""}
                />
                <div>
                    <div className="text-base">{placedItem.nftMetadata?.nftName}</div>
                    <div>
                        <div className="flex items-center gap-1">
                            <Image src={collection?.imageUrl} className="w-5 h-5" />
                            <div className="text-sm text-muted-foreground">
                                {collection?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PressableCard>
    )
}
