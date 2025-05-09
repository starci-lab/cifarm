import { ItemCard, TintColor } from "@/components"
import { InventorySchema } from "@/modules/entities"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { assetInventoryTypesMap } from "@/modules/assets"
import { useAppSelector } from "@/redux"

interface InventoryCardProps {
  inventory: InventorySchema | null;
}

export const InventoryCard: FC<InventoryCardProps> = ({
    inventory,
}) => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const inventoryType = staticSwr.data?.data.inventoryTypes.find(
        (inventoryType) => inventoryType.id === inventory?.inventoryType
    )

    const selectedInventoryId = useAppSelector(
        (state) => state.sessionReducer.selectedInventoryId
    )
    return (
        <ItemCard
            name={(() => {
                if (!inventoryType) return
                return assetInventoryTypesMap[inventoryType.displayId]?.name
            })()}
            description={(() => {
                if (!inventoryType) return
                return assetInventoryTypesMap[inventoryType.displayId]?.description
            })()}
            showTooltip={true}
            tint={inventory?.id === selectedInventoryId}
            quantity={inventory?.quantity}
            stackable={inventoryType?.stackable}
            imageUrl={(() => {
                if (!inventoryType) return
                return assetInventoryTypesMap[inventoryType.displayId]?.base.assetUrl
            })()}
            isQuality={(() => {
                const product = staticSwr.data?.data.products.find(
                    (product) => product.id === inventoryType?.product
                )
                return product?.isQuality
            })()}
            tintColor={TintColor.Green}
            frameOnly={!inventoryType}
        />
    )   
}
