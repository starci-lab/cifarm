import { ItemCard, TintColor } from "@/components"
import { InventoryKind, InventorySchema } from "@/types"
import React, { FC } from "react"
import { MoveInventoryMessage } from "@/singleton"
import { assetInventoryTypesMap } from "@/modules/assets"
import {
    useAppDispatch,
    useAppSelector,
    setSelectedInventoryId,
} from "@/redux"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

interface InventoryCardProps {
  inventory: InventorySchema | null;
  index: number;
  kind: InventoryKind;
}

export const InventoryCard: FC<InventoryCardProps> = ({
    inventory,
    index,
    kind,
}) => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const inventoryType = staticData?.inventoryTypes.find(
        (inventoryType) => inventoryType.id === inventory?.inventoryType
    )
    const selectedInventoryId = useAppSelector(
        (state) => state.modalReducer.shipModal.selectedShipInventoryId
    )
    const dispatch = useAppDispatch()
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
            onClick={() => {
                if (!selectedInventoryId) {
                    if (!inventory) return
                    dispatch(setSelectedInventoryId(inventory.id))
                } else {
                    dispatch(setSelectedInventoryId())
                    const moveInventoryMessage: MoveInventoryMessage = {
                        inventoryId: selectedInventoryId,
                        isTool: kind === InventoryKind.Tool,
                        index,
                    }
                    ExternalEventEmitter.emit(
                        ExternalEventName.RequestMoveInventory,
                        moveInventoryMessage
                    )
                }
            }}
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
