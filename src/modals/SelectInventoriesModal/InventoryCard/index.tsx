import { ItemCard } from "@/components"
import { InventorySchema } from "@/types"
import React, { FC } from "react"
import { assetInventoryTypesMap } from "@/modules/assets"
import {
    setSelectedDeliveryInventoryIds,
    useAppDispatch,
    useAppSelector,
} from "@/redux"

interface InventoryCardProps {
  inventory: InventorySchema | null;
}

export const InventoryCard: FC<InventoryCardProps> = ({ inventory }) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const inventoryType = staticData?.inventoryTypes.find(
        (inventoryType) => inventoryType.id === inventory?.inventoryType
    )
    const slotsDeliveryInventoryLeft = useAppSelector(
        (state) => state.selectionReducer.slotsDeliveryInventoryLeft
    )
    const dispatch = useAppDispatch()
    const selectedDeliveryInventoryIds = useAppSelector(
        (state) => state.selectionReducer.selectedDeliveryInventoryIds
    )
    const isSelected = selectedDeliveryInventoryIds.includes(inventory?.id ?? "")
    return (
        <ItemCard
            quantity={inventory?.quantity?.toString()}
            stackable={inventoryType?.stackable}
            imageUrl={(() => {
                if (!inventoryType) return
                return assetInventoryTypesMap[inventoryType.displayId]?.base.assetUrl
            })()}
            isSelected={isSelected}
            onClick={() => {
                if (isSelected) {
                    dispatch(
                        setSelectedDeliveryInventoryIds(
                            selectedDeliveryInventoryIds.filter((id) => id !== inventory?.id)
                        )
                    )
                } else {
                    if (slotsDeliveryInventoryLeft === 0) return
                    dispatch(
                        setSelectedDeliveryInventoryIds([
                            ...selectedDeliveryInventoryIds,
                            inventory?.id ?? "",
                        ])
                    )
                }
            }}
            isQuality={(() => {
                const product = staticData?.products.find(
                    (product) => product.id === inventoryType?.product
                )
                return product?.isQuality
            })()}
            frameOnly={!inventoryType}
        />
    )
}
