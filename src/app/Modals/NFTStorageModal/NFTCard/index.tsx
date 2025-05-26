import React, { FC, useEffect, useState } from "react"
import { PlacedItemSchema, PlacedItemType } from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { NFT_STORAGE_DISCLOSURE, QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { Image, Card, CardBody, Spacer, ExtendedBadge, ExtendedButton, CardFooter } from "@/components"
import {
    ExternalEventEmitter,
    ExternalEventName,
    PlaceNFTItemMessage,
} from "@/modules/event-emitter"
import { useDisclosure } from "react-use-disclosure"
import { AssetData, assetFruitMap } from "@/modules/assets"
import { valuesWithKey } from "@/modules/common"
import { envConfig } from "@/env"

export interface NFTCardProps {
  placedItem: PlacedItemSchema;
}

export const NFTCard: FC<NFTCardProps> = ({ placedItem }) => {
    const [assetData, setAssetData] = useState<AssetData | undefined>(
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
            const _assetData=
          assetFruitMap[fruit.displayId]?.base?.stages[
              placedItem.fruitInfo?.currentStage ?? 0
          ]
            if (!_assetData) throw new Error("Asset data not found")
            setAssetData(_assetData)
            break
        }
        default:
            throw new Error("Placed item type not found")
        }
    }, [data])

    const network = envConfig().network
    const collection = valuesWithKey(data?.data.nftCollections ?? {}).find(
        (collection) => placedItem.placedItemType === collection[network]?.placedItemTypeId
    )
    return (
        <Card
            variant="default"
        >
            <CardBody className="p-3">
                <Image
                    className="w-24 h-24 aspect-square object-contain"
                    src={assetData?.assetUrl ?? ""}
                />
                <Spacer y={2} />
                <div>
                    <div className="text-lg">{placedItem.nftMetadata?.nftName}</div>
                    <div>
                        <div className="flex items-center gap-1">
                            <ExtendedBadge color="secondary" icon={<Image src={collection?.[network]?.imageUrl ?? ""} className="w-6 h-6" />}>
                                {collection?.[network]?.name ?? ""}
                            </ExtendedBadge>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="p-3">
                <ExtendedButton
                    color="secondary"
                    variant="flat"
                    className="flex-1"
                >
                    Manage
                </ExtendedButton>
                <ExtendedButton
                    className="flex-1"
                    color="primary"
                    onClick={() => {
                        close()
                        const eventMessage: PlaceNFTItemMessage = {
                            placedItem,
                        }
                        ExternalEventEmitter.emit(ExternalEventName.PlaceNFTItem, eventMessage)
                    }}
                >
                    Place
                </ExtendedButton>
            </CardFooter>
        </Card>
    )
}
