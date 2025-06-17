import React, { FC } from "react"
import { BuildingKind, PlacedItemSchema } from "@/types"
import { BeeHouseContent } from "./BeeHouseContent"
import { useAppSelector } from "@/redux"

interface BuildingContentProps {
  placedItem: PlacedItemSchema;
}

export const BuildingContent: FC<BuildingContentProps> = ({ placedItem }) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const placedItemType = staticData?.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const building = staticData?.buildings.find(
        (building) => building.id === placedItemType.building
    )

    if (!building) {
        throw new Error("Building not found")
    }
    const renderContent = () => {
        switch (building.kind) {
        case BuildingKind.BeeHouse: {
            return <BeeHouseContent placedItem={placedItem} />
        }
        default: {
            return null
        }
        }
    }

    return (
        <>
            {renderContent()}
        </>
    )
}
