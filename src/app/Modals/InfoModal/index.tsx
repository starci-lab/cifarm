"use client"
import {
    INFO_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"
import { ModalHeader } from "@/components"
import {
    ExternalEventEmitter,
    ExternalEventName,
    ModalName,
} from "@/game/events"
import { useAppSelector } from "@/redux"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { placedItemTypeAssetMap } from "@/game"
import { getAssetDataRaw } from "@/game/tilemap"
import { PlacedItemType } from "@/modules/entities"
import { FruitContent } from "./FruitContent"
import { TileContent } from "./TileContent"
import { AnimalContent } from "./AnimalContent"
import { BuildingContent } from "./BuildingContent"
export const InfoModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INFO_DISCLOSURE)

    const placedItem = useAppSelector(
        (state) => state.sessionReducer.placedItem
    )
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )
    const placedItemType = swr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )

    if (!placedItemType) {
        return null
    }
    if (!placedItem) {
        return null
    }
    if (!swr.data) {
        return null
    }
    const mapAssetData = getAssetDataRaw({
        placedItemType,
        queryStaticResponsePartial: swr.data?.data,
        isAdult: placedItem.animalInfo?.isAdult,
        fruitStage: placedItem.fruitInfo?.currentStage,
    })
    if (!mapAssetData) {
        return null
    }
    const renderContent = () => {
        switch (placedItemType.type) {
        case PlacedItemType.Fruit: {
            return <FruitContent placedItem={placedItem} />
        }
        case PlacedItemType.Tile: {
            return <TileContent placedItem={placedItem} />
        }
        case PlacedItemType.Animal: {
            return <AnimalContent placedItem={placedItem} />
        }
        case PlacedItemType.Building: {
            return <BuildingContent placedItem={placedItem} />
        }
        default: {
            throw new Error("Invalid placed item type")
        }
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                toggle(value)
                if (!value) {
                    ExternalEventEmitter.emit(ExternalEventName.CloseExternalModal, {
                        modalName: ModalName.Info,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader
                            title={placedItemTypeAssetMap[placedItemType.displayId].name}
                        />
                    </DialogTitle>
                </DialogHeader>
                {renderContent()}
            </DialogContent>
        </Dialog>
    )
}
