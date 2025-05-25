import React, { FC } from "react"
import {
    ExtendedButton,
    Image,
    Spacer,
    Title,
    GridTable,
    Separator,
} from "@/components"
import { AssetIconId } from "@/modules/assets"
import { assetIconMap } from "@/modules/assets"
import { useSingletonHook } from "@/modules/singleton-hook"
import { BUY_GOLDS_DISCLOSURE, BUY_ENERGY_DISCLOSURE, GRAPHQL_QUERY_USER_SWR, GRAPHQL_QUERY_INVENTORIES_SWR } from "@/app/constants"
import { useGraphQLQueryUserSwr, useGraphQLQueryInventoriesSwr } from "@/hooks"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/modules/entities"
import { useDisclosure } from "react-use-disclosure"
import { useAppSelector } from "@/redux"
import { ArrowsClockwise } from "@phosphor-icons/react"
import { getMaxEnergy } from "@/modules/common"

export const InGameTab: FC = () => {
    const inventories = useAppSelector(
        state => state.sessionReducer.inventories
    )
    const { swr: userSwr } = useSingletonHook<
        ReturnType<typeof useGraphQLQueryUserSwr>
    >(GRAPHQL_QUERY_USER_SWR)
    const user = useAppSelector(
        (state) => state.sessionReducer.user
    )
    const { swr: inventoriesSwr } = useSingletonHook<
        ReturnType<typeof useGraphQLQueryInventoriesSwr>
    >(GRAPHQL_QUERY_INVENTORIES_SWR)
    const { open: openBuyGoldsModal } =
        useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_GOLDS_DISCLOSURE)
    const { open: openBuyEnergyModal } =
        useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_ENERGY_DISCLOSURE)
    return (
        <div>
            <div>
                <div className="flex gap-4 items-center justify-between">
                    <Title
                        title="Golds"
                        classNames={{
                            title: "text-2xl text-muted-foreground",
                        }}
                    />
                    <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => userSwr.mutate()}>
                        <ArrowsClockwise />
                    </ExtendedButton>
                </div>
                <Spacer y={4} />
                <div className="flex justify-between h-16 items-center">
                    <div className="flex gap-2 items-center">
                        <Image
                            className="w-10 h-10"
                            src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                        />
                        <div className="text-2xl font-bold">
                            {user?.golds}
                        </div>
                    </div>
                    <ExtendedButton onClick={openBuyGoldsModal}>Buy</ExtendedButton>
                </div>
            </div>
            <Spacer y={6} />
            <div>
                <div className="flex gap-4 items-center justify-between">
                    <Title
                        title="Energy"
                        classNames={{
                            title: "text-2xl text-muted-foreground",
                        }}
                    />
                    <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => userSwr.mutate()}>
                        <ArrowsClockwise />
                    </ExtendedButton>
                </div>
                <Spacer y={4} />
                <div className="flex justify-between h-16 items-center">
                    <div className="flex gap-2 items-center">
                        <Image
                            className="w-10 h-10"
                            src={assetIconMap[AssetIconId.Energy].base.assetUrl}
                        />
                        <div className="text-2xl font-bold">
                            {user?.energy}/{getMaxEnergy(user?.level ?? 0)}
                        </div>
                    </div>
                    <ExtendedButton onClick={openBuyEnergyModal}>Buy</ExtendedButton>
                </div>
            </div>
            <Spacer y={6} />
            <div className="flex gap-4 items-center justify-between">
                <Title
                    title="Inventories"
                    classNames={{
                        title: "text-2xl text-muted-foreground",
                    }}
                />
                <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => inventoriesSwr.mutate()}>
                    <ArrowsClockwise />
                </ExtendedButton>
            </div>
            <Spacer y={4} />
            <div className="bg-content-2 rounded-lg">
                <div className="p-4">
                    <Title
                        title="Tool"
                        tooltipString="The items you have in your inventory."
                    />
                    <Spacer y={4} />
                    <GridTable
                        classNames={{
                            container: "grid-none flex flex-wrap gap-2 justify-start",
                        }}
                        enableScroll={false}
                        items={
                            inventories.filter(
                                (inventory) => inventory.kind === InventoryKind.Tool
                            ) ?? []
                        }
                        contentCallback={(inventory) => (
                            <InventoryCard inventory={inventory} />
                        )}
                        keyCallback={(item) => `${item.id}`}
                    />
                </div>
                <Separator />
                <div className="p-4">
                    <Title
                        title="Storage"
                        tooltipString="The items you have in your storage."
                    />
                    <Spacer y={4} />
                    <GridTable
                        classNames={{
                            container: "grid-none flex flex-wrap gap-2 justify-start",
                        }}
                        enableScroll={false}
                        items={
                            inventories.filter(
                                (inventory) => inventory.kind === InventoryKind.Storage
                            ) ?? []
                        }
                        contentCallback={(inventory) => (
                            <InventoryCard inventory={inventory} />
                        )}
                        keyCallback={(item) => `${item.id}`}
                    />
                </div>
                <Separator />
                <div className="p-4">
                    <Title
                        title="Delivery"
                        tooltipString="The items you have in your delivery."
                    />
                    <Spacer y={4} />
                    <GridTable
                        classNames={{
                            container: "grid-none flex flex-wrap gap-2 justify-start",
                        }}
                        enableScroll={false}
                        items={
                            inventories.filter(
                                (inventory) => inventory.kind === InventoryKind.Delivery
                            ) ?? []
                        }
                        contentCallback={(inventory) => (
                            <InventoryCard inventory={inventory} />
                        )}
                        keyCallback={(item) => `${item.id}`}
                    />
                </div>
            </div>
        </div>
    )
}
