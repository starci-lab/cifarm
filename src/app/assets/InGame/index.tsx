import { BUY_GOLDS_DISCLOSURE, GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { ExtendedButton, Image, Spacer, Title } from "@/components"
import { assetIconMap, AssetIconId } from "@/modules/assets"
import React, { FC } from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryUserSwr } from "@/hooks"
import { InventoryCard } from "./InventoryCard"
import { useDisclosure } from "react-use-disclosure"
import { useAppSelector } from "@/redux"
import { InventoryKind } from "@/modules/entities"

export const InGame: FC = () => {
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(GRAPHQL_QUERY_USER_SWR)

    const inventories = useAppSelector(state => state.sessionReducer.inventories)

    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_GOLDS_DISCLOSURE)
    return (
        <>
            <div>
                <Title title="Golds" tooltipString="The in-game golds" classNames={{
                    title: "text-xl",
                    tooltip: "w-[28px] h-[28px]"
                }} />
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
                <Title title="Inventories" tooltipString="The items you have in your inventories." />
                <Spacer y={4} />
                <div>
                    <Title title="Tool" tooltipString="The items you have in your inventory." />
                    <Spacer y={4} />
                    <div className="flex flex-col gap-2">
                        {inventories.filter((inventory) => inventory.kind === InventoryKind.Storage).map((inventory) => (
                            <InventoryCard key={inventory.id} inventory={inventory} />
                        ))}
                    </div>
                </div>
                <Spacer y={4} />
                <div>
                    <Title title="Storage" tooltipString="The items you have in your storage." />
                    <Spacer y={4} />
                    <div className="flex flex-col gap-2">
                        {inventories.filter((inventory) => inventory.kind === InventoryKind.Delivery).map((inventory) => (
                            <InventoryCard key={inventory.id} inventory={inventory} />
                        ))}
                    </div>
                </div>
                <Spacer y={4} />
                <div>
                    <Title title="Delivery" tooltipString="The items you have in your delivery." />
                    <Spacer y={4} />
                    <div className="flex flex-col gap-2">
                        {inventories.filter((inventory) => inventory.kind === InventoryKind.Delivery).map((inventory) => (
                            <InventoryCard key={inventory.id} inventory={inventory} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
