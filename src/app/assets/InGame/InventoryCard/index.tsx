import { Card, CardContent, ItemCard } from "@/components"
import { InventorySchema, InventoryType } from "@/modules/entities"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { assetInventoryTypesMap } from "@/modules/assets"

export interface InventoryCardProps {
  inventory: InventorySchema;
}
export const InventoryCard: FC<InventoryCardProps> = ({ inventory }) => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)
    const inventoryType = staticSwr.data?.data.inventoryTypes.find(
        (type) => type.id === inventory.inventoryType
    )
    if (!inventoryType) return null
    const product = staticSwr.data?.data.products.find(
        (product) => 
            inventoryType.type === InventoryType.Product &&
            product.id === inventoryType.product
    )
    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex gap-2">
                    <ItemCard imageUrl={(() => {
                        return (
                            assetInventoryTypesMap[inventoryType.displayId]?.base
                                .assetUrl ?? ""
                        )
                    })()}
                    stackable={inventoryType.stackable}
                    quantity={inventory.quantity}
                    isQuality={product?.isQuality}
                    />
                    <div>
                        <div className="text-sm">{assetInventoryTypesMap[inventoryType.displayId]?.name}</div>
                        <div className="text-xs text-muted-foreground">{assetInventoryTypesMap[inventoryType.displayId]?.description}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
