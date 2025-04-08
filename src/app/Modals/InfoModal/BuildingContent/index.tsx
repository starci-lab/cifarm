import React, { FC } from "react"
import { BuildingKind, PlacedItemSchema } from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { BeeHouseContent } from "./BeeHouseContent"

interface BuildingContentProps {
  placedItem: PlacedItemSchema;
}

export const BuildingContent: FC<BuildingContentProps> = ({ placedItem }) => {
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const placedItemType = swr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const building = swr.data?.data.buildings.find(
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
