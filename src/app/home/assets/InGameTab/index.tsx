import React, { FC } from "react"
import { ExtendedButton, Image, Spacer, Title, GridTable } from "@/components"
import { AssetIconId } from "@/modules/assets"
import { assetIconMap } from "@/modules/assets"
import { useSingletonHook } from "@/modules/singleton-hook"
import { BUY_GOLDS_DISCLOSURE, GRAPHQL_QUERY_INVENTORIES_SWR, GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { useGraphQLQueryUserSwr, useGraphQLQueryInventoriesSwr } from "@/hooks"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/modules/entities"
import { useDisclosure } from "react-use-disclosure"

export const InGameTab: FC = () => {
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(GRAPHQL_QUERY_USER_SWR)
    const { swr: inventoriesSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwr>
  >(GRAPHQL_QUERY_INVENTORIES_SWR)
    const { open: openBuyGoldsModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_GOLDS_DISCLOSURE)
    return (
        <div>
            <div>
                <Title title="Golds" tooltipString="The in-game golds" />
                <Spacer y={4} />
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Image
                            className="w-10 h-10"
                            src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                        />
                        <div className="text-2xl font-bold">{userSwr.data?.data.user?.golds}</div>
                    </div>
                    <ExtendedButton onClick={openBuyGoldsModal}>Buy</ExtendedButton>
                </div>
            </div>
            <Spacer y={6} />
            <div>
                <Title
                    title="Inventories"
                    tooltipString="The items you have in your inventory."
                />
                <Spacer y={4} />
                <GridTable
                    enableScroll={false}
                    items={inventoriesSwr.data?.data.inventories.filter((inventory) => inventory.kind === InventoryKind.Storage) ?? []}
                    contentCallback={(inventory) => (
                        <InventoryCard inventory={inventory} />
                    )}
                    keyCallback={(item) => `${item.id}`}
                />
            </div>
        </div>
    )
}
