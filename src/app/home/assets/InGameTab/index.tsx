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
import { BUY_GOLDS_DISCLOSURE, GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { useGraphQLQueryUserSwr } from "@/hooks"
import { InventoryCard } from "./InventoryCard"
import { InventoryKind } from "@/modules/entities"
import { useDisclosure } from "react-use-disclosure"
import { useAppSelector } from "@/redux"

export const InGameTab: FC = () => {
    const { swr: userSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryUserSwr>
  >(GRAPHQL_QUERY_USER_SWR)
    const inventories = useAppSelector(
        (state) => state.sessionReducer.inventories
    )
    const { open: openBuyGoldsModal } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_GOLDS_DISCLOSURE)
    return (
        <div>
            <div>
                <Title
                    title="Golds"
                    classNames={{
                        title: "text-2xl text-muted-foreground",
                    }}
                />
                <Spacer y={4} />
                <div className="flex justify-between bg-content-2 rounded-lg px-3 py-6">
                    <div className="flex gap-2 items-center">
                        <Image
                            className="w-10 h-10"
                            src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                        />
                        <div className="text-2xl font-bold">
                            {userSwr.data?.data.user?.golds}
                        </div>
                    </div>
                    <ExtendedButton onClick={openBuyGoldsModal}>Buy</ExtendedButton>
                </div>
            </div>
            <Spacer y={6} />
            <Title
                title="Inventories"
                classNames={{
                    title: "text-2xl text-muted-foreground",
                }}
            />
            <Spacer y={4} />
            <div className="bg-content-2 rounded-lg">
                <div className="p-3 pt-2">
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
                <div className="p-3 pt-2">
                    <Title
                        title="Storage"
                        tooltipString="The items you have in your storage."
                    />
                    <Spacer y={2} />
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
                <div className="p-3 pt-2">
                    <Title
                        title="Delivery"
                        tooltipString="The items you have in your delivery."
                    />
                    <Spacer y={2} />
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
