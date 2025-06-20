
import React, { FC, useEffect, useState } from "react"
import { PlacedItemSchema, PlacedItemType } from "@/types"
import { useSingletonHook } from "@/singleton"
import { NFT_STORAGE_MODAL_DISCLOSURE } from "@/singleton"
import { Image, Card, CardBody, Spacer, ExtendedBadge, ExtendedButton, CardFooter } from "@/components"
import {
    ExternalEventEmitter,
    ExternalEventName,
    PlaceNFTItemMessage,
} from "@/modules/event-emitter"
import { useDisclosure } from "react-use-disclosure"
import { AssetData, assetFruitMap } from "@/modules/assets"
import { valuesWithKey } from "@/utils"
import { envConfig } from "@/env"
import { useAppSelector } from "@/redux"

export interface NFTCardProps {
  placedItem: PlacedItemSchema;
}

export const NFTCard: FC<NFTCardProps> = ({ placedItem }) => {
    const [assetData, setAssetData] = useState<AssetData | undefined>(
        undefined
    )
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const { close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(NFT_STORAGE_MODAL_DISCLOSURE)

    useEffect(() => {
        if (!staticData) return
        const placedItemType = staticData.placedItemTypes.find(
            (placedItemType) => placedItemType.id === placedItem.placedItemType
        )
        if (!placedItemType) throw new Error("Placed item type not found")
        switch (placedItemType.type) {
        case PlacedItemType.Fruit: {
            const fruit = staticData.fruits.find(
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
    }, [staticData])

    const network = envConfig().network
    const collection = valuesWithKey(staticData?.nftCollections ?? {}).find(
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
