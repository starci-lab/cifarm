import { ItemCard } from "@/components"
import { InventorySchema } from "@/modules/entities"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/(core)/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { assetInventoryTypesMap } from "@/modules/assets"
import { setSelectedRetrieveInventoryIds, useAppDispatch, useAppSelector } from "@/redux"

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
    const selectedRetrieveInventoryIds = useAppSelector(state => state.sessionReducer.selectedRetrieveInventoryIds)
    return (
        <ItemCard
            quantity={inventory?.quantity?.toString()}
            stackable={inventoryType?.stackable}
            imageUrl={(() => {
                if (!inventoryType) return
                return assetInventoryTypesMap[inventoryType.displayId]?.base.assetUrl
            })()}
            isSelected={selectedRetrieveInventoryIds.includes(inventory?.id ?? "")}
            onClick={() => {
                if (!inventory?.id) return
                dispatch(setSelectedRetrieveInventoryIds(selectedRetrieveInventoryIds.includes(inventory?.id ?? "") ? selectedRetrieveInventoryIds.filter(id => id !== inventory?.id) : [...selectedRetrieveInventoryIds, inventory?.id ?? ""]))
            }}
            isQuality={(() => {
                const product = staticSwr.data?.data.products.find(
                    (product) => product.id === inventoryType?.product
                )
                return product?.isQuality
            })()}
            frameOnly={!inventoryType}
        />
    )
}
