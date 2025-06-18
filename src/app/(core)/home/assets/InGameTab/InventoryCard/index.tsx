import { ItemCard, TintColor } from "@/components"
import { InventorySchema } from "@/types"
import React, { FC } from "react"
import { assetInventoryTypesMap } from "@/modules/assets"
import { useAppSelector } from "@/redux"

interface InventoryCardProps {
  inventory: InventorySchema | null;
}

export const InventoryCard: FC<InventoryCardProps> = ({
    inventory,
}) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const inventoryType = staticData?.inventoryTypes.find(
        (inventoryType) => inventoryType.id === inventory?.inventoryType
    )

    const selectedInventoryId = useAppSelector(
        (state) => state.selectionReducer.selectedShipInventoryId
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
            quantity={inventory?.quantity?.toString()}
            stackable={inventoryType?.stackable}
            imageUrl={(() => {
                if (!inventoryType) return
                return assetInventoryTypesMap[inventoryType.displayId]?.base.assetUrl
            })()}
            isQuality={(() => {
                const product = staticData?.products.find(
                    (product) => product.id === inventoryType?.product
                )
                return product?.isQuality
            })()}
            tintColor={TintColor.Green}
            frameOnly={!inventoryType}
        />
    )   
}
