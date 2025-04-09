import { Card, CardContent, ScaledImage, DraggableAbsoluteCard } from "@/components"
import { InventorySchema } from "@/modules/entities"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { assetInventoryTypesMap } from "@/modules/assets"
interface InventoryCardProps {
  inventory: InventorySchema;
}

export const InventoryCard: FC<InventoryCardProps> = ({ inventory }) => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const inventoryType = staticSwr.data?.data.inventoryTypes.find(
        (inventoryType) => inventoryType.id === inventory.inventoryType
    )
    if (!inventoryType) throw new Error("Inventory type not found")
    return (
        <Card className="p-0 aspect-square">
            <CardContent className="grid place-items-center p-0 w-full h-full">
                <DraggableAbsoluteCard id={inventory.id} classNames={{ container: "w-full h-full" }}>
                    <ScaledImage
                        src={
                            assetInventoryTypesMap[inventoryType.displayId]?.base.assetUrl ?? ""
                        }
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    {inventoryType.stackable && (
                        <div className="absolute bottom-0 right-0 bg-background/50 text-sm grid place-items-center rounded-md p-1">
                            {inventory.quantity}
                        </div>
                    )}
                </DraggableAbsoluteCard>
            </CardContent>
        </Card>
    )
}
