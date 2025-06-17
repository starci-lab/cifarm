"use client"
import {
    INFO_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"
import { useAppSelector } from "@/redux"
import { getAssetDataRaw } from "@/game/tilemap"
import { PlacedItemType } from "@/types"
import { FruitContent } from "./FruitContent"
import { TileContent } from "./TileContent"
import { AnimalContent } from "./AnimalContent"
import { BuildingContent } from "./BuildingContent"
import { getPlacedItemTypeName } from "./utils"
import { PetContent } from "./PetContent"

export const InfoModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INFO_MODAL_DISCLOSURE)

    const selectedPlacedItemId = useAppSelector(
        (state) => state.gameplayReducer.gameplaySelection.selectedPlacedItemId
    )
    const placedItems = useAppSelector(
        (state) => state.apiReducer.coreApi.placedItems ?? []
    )
    const placedItem = placedItems.find(
        (placedItem) => placedItem.id === selectedPlacedItemId
    )
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    if (!placedItem) {
        return null
    }
    const placedItemType = staticData?.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        return null
    }
    if (!placedItem) {
        return null
    }
    if (!staticData) {
        return null
    }
    const mapAssetData = getAssetDataRaw({
        placedItemType,
        queryStaticResponsePartial: staticData,
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
        case PlacedItemType.Pet: {
            return <PetContent placedItem={placedItem} />
        }
        case PlacedItemType.Terrain: {
            return <></>
        }
        default: {
            throw new Error("Invalid placed item type")
        }
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={toggle}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {getPlacedItemTypeName(placedItemType.id, staticData) ?? ""}
                    </DialogTitle>
                </DialogHeader>
                {renderContent()}
            </DialogContent>
        </Dialog>
    )
}
