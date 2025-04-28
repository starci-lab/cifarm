import { BUY_GOLDS_DISCLOSURE, GRAPHQL_QUERY_INVENTORIES_SWR, GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { ExtendedButton, Image, Spacer, Title } from "@/components"
import { assetIconMap, AssetIconId } from "@/modules/assets"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryInventoriesSwr, useGraphQLQueryUserSwr } from "@/hooks"
import { InventoryCard } from "./InventoryCard"
import { useDisclosure } from "react-use-disclosure"
export const InGame: FC = () => {
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(GRAPHQL_QUERY_USER_SWR)

    const { swr: inventoriesSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryInventoriesSwr>
  >(GRAPHQL_QUERY_INVENTORIES_SWR)

    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_GOLDS_DISCLOSURE)
    return (
        <>
            <div>
                <Title title="Golds" tooltipString="The in-game golds" />
                <Spacer y={4} />
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Image
                            className="w-6 h-6"
                            src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                        />
                        <div>{userSwr.data?.data.user?.golds}</div>
                    </div>
                    <ExtendedButton onClick={open}>
                    Buy
                    </ExtendedButton>
                </div>
            </div>
            <Spacer y={6} />
            <div>
                <Title title="Inventories" tooltipString="The items you have in your inventory." />
                <Spacer y={4} />
                <div className="flex flex-col gap-2">
                    {inventoriesSwr.data?.data.inventories.map((inventory) => (
                        <InventoryCard key={inventory.id} inventory={inventory} />
                    ))}
                </div>
            </div>
        </>
    )
}
