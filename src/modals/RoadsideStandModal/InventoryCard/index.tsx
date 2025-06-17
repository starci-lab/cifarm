import { ItemCard } from "@/components"
import { InventorySchema } from "@/modules/entities"
import React, { FC } from "react"
import { assetInventoryTypesMap } from "@/modules/assets"
import {
    setSelectedRetrieveInventoryIds,
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
    const dispatch = useAppDispatch()
    const selectedRetrieveInventoryIds = useAppSelector(
        (state) => state.selectionReducer.selectedRetrieveInventoryIds
    )
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
                dispatch(
                    setSelectedRetrieveInventoryIds(
                        selectedRetrieveInventoryIds.includes(inventory?.id ?? "")
                            ? selectedRetrieveInventoryIds.filter(
                                (id) => id !== inventory?.id
                            )
                            : [...selectedRetrieveInventoryIds, inventory?.id ?? ""]
                    )
                )
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
