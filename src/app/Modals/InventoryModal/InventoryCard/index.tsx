import { ItemCard } from "@/components"
import { InventoryKind, InventorySchema } from "@/modules/entities"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { MoveInventoryMessage, useGraphQLQueryStaticSwr } from "@/hooks"
import { assetInventoryTypesMap } from "@/modules/assets"
import {
    useAppDispatch,
    useAppSelector,
    setSelectedInventoryId,
} from "@/redux"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

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
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const inventoryType = staticSwr.data?.data.inventoryTypes.find(
        (inventoryType) => inventoryType.id === inventory?.inventoryType
    )

    const selectedInventoryId = useAppSelector(
        (state) => state.sessionReducer.selectedInventoryId
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
            isSelected={inventory?.id === selectedInventoryId}
            quantity={inventory?.quantity}
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
                const product = staticSwr.data?.data.products.find(
                    (product) => product.id === inventoryType?.product
                )
                return product?.isQuality
            })()}
            frameOnly={!inventoryType}
        />
    )   
}
