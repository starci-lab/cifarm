import { ItemCard } from "@/components"
import { InventorySchema } from "@/modules/entities"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { assetInventoryTypesMap } from "@/modules/assets"
import { setSelectedRetrieveInventoryId, useAppDispatch, useAppSelector } from "@/redux"

interface InventoryCardProps {
  inventory: InventorySchema | null;
}

export const InventoryCard: FC<InventoryCardProps> = ({ inventory }) => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const inventoryType = staticSwr.data?.data.inventoryTypes.find(
        (inventoryType) => inventoryType.id === inventory?.inventoryType
    )
    const dispatch = useAppDispatch()
    const selectedRetrieveInventoryId = useAppSelector(state => state.sessionReducer.selectedRetrieveInventoryId)
    return (
        <ItemCard
            quantity={inventory?.quantity}
            stackable={inventoryType?.stackable}
            imageUrl={(() => {
                if (!inventoryType) return
                return assetInventoryTypesMap[inventoryType.displayId]?.base.assetUrl
            })()}
            faded={inventory?.id !== selectedRetrieveInventoryId}
            onClick={() => {
                dispatch(setSelectedRetrieveInventoryId(inventory?.id))
            }}
            frameOnly={!inventoryType}
        />
    )
}
