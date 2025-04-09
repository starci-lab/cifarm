import { setShopTab, useAppDispatch, useAppSelector } from "@/redux"
import React from "react"
import {
    FilterBar,
    Spacer,
    ModalHeader,
    ScrollableTabs,
    GridTable,
} from "@/components"
import { GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION, GRAPHQL_QUERY_STATIC_SWR, SHOP_DISCLOSURE } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { shopTabMap } from "./config"
import { useGraphQLQueryStaticSwr, useGraphQLQueryPlacedItemsSwrMutation } from "@/hooks"
import { ShopCard } from "./ShopCard"
import { assetShopMap } from "@/modules/assets"
import { getAnimalLimit, getBuildingLimit, getFruitLimit, getTileLimit, getPetLimit } from "./limit"

export enum ShopTab {
  Seeds = "Seeds",
  Flowers = "Flowers",
  Animals = "Animals",
  Buildings = "Buildings",
  Fruits = "Fruits",
  Tiles = "Tiles",
  Supplies = "Supplies",
  Tools = "Tools",
  Pets = "Pets",
  Decorations = "Decorations",
}

export const ShopModal = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SHOP_DISCLOSURE)
    const shopTab = useAppSelector((state) => state.tabReducer.shopTab)
    const dispatch = useAppDispatch()

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const { swrMutation: placedItemsSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLQueryPlacedItemsSwrMutation>>(
        GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION
    )

    const renderGridTable = () => {
        if (!staticSwr.data?.data) return null
        switch (shopTab) {
        case ShopTab.Seeds: {
            const crops = staticSwr.data.data.crops
            return (
                <GridTable
                    items={crops}
                    contentCallback={(crop) => {
                        return (
                            <ShopCard
                                onClick={() => {}}
                                imageUrl={assetShopMap.crops[crop.displayId]?.assetUrl ?? ""}
                                price={crop.price}
                                unlockedLevel={crop.unlockLevel}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Flowers: {
            const flowers = staticSwr.data.data.flowers
            return (
                <GridTable
                    items={flowers}
                    contentCallback={(flower) => {
                        return (
                            <ShopCard
                                onClick={() => {}}
                                imageUrl={assetShopMap.flowers[flower.displayId]?.assetUrl ?? ""}
                                price={flower.price}
                                unlockedLevel={flower.unlockLevel}

                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Animals: {
            const animals = staticSwr.data.data.animals
            return (
                <GridTable
                    items={animals}
                    contentCallback={(animal) => {
                        if (!staticSwr.data?.data) {
                            throw new Error("Static data not found")
                        }
                        const { selectedLimit, placedItemCount } = getAnimalLimit({
                            data: staticSwr.data?.data,
                            animal,
                            placedItems: placedItemsSwrMutation.data?.data.placedItems ?? [],
                        }) 
                        return (
                            <ShopCard
                                onClick={() => {}}
                                imageUrl={assetShopMap.animals[animal.displayId]?.assetUrl ?? ""}
                                price={animal.price ?? 0}
                                unlockedLevel={animal.unlockLevel}
                                ownership={placedItemCount}
                                limit={selectedLimit}
                                showLimit={true}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Buildings: {
            const buildings = staticSwr.data.data.buildings.filter((building) => building.availableInShop)
            const { totalLimit, totalPlacedItemCount } = getBuildingLimit({
                data: staticSwr.data?.data,
                building: buildings[0],
                placedItems: placedItemsSwrMutation.data?.data.placedItems ?? [],
            })
            return (
                <>
                    <div>
                        Limit: {`${totalPlacedItemCount}/${totalLimit}`}
                    </div>
                    <Spacer y={2} />
                    <GridTable
                        items={buildings}
                        contentCallback={(building) => {
                            if (!staticSwr.data?.data) {
                                throw new Error("Static data not found")
                            }
                            const { selectedLimit, placedItemCount } = getBuildingLimit({
                                data: staticSwr.data?.data,
                                building,
                                placedItems: placedItemsSwrMutation.data?.data.placedItems ?? [],
                            }) 
                            return (
                                <ShopCard
                                    onClick={() => {}}
                                    imageUrl={assetShopMap.buildings[building.displayId]?.assetUrl ?? ""}
                                    price={building.price ?? 0}
                                    unlockedLevel={building.unlockLevel}
                                    ownership={placedItemCount}
                                    limit={selectedLimit}
                                    showLimit={true}
                                />
                            )
                        }}
                    />
                </>
            )
        }
        case ShopTab.Fruits: {
            const fruits = staticSwr.data.data.fruits.filter((fruit) => fruit.availableInShop)
            const { totalLimit, totalPlacedItemCount } = getFruitLimit({
                data: staticSwr.data?.data,
                placedItems: placedItemsSwrMutation.data?.data.placedItems ?? [],
            })
            return (
                <>
                    <div>
                        Limit: {`${totalPlacedItemCount}/${totalLimit}`}
                    </div>
                    <Spacer y={2} />
                    <GridTable
                        items={fruits}
                        contentCallback={(fruit) => {
                            return (
                                <ShopCard
                                    onClick={() => {}}
                                    imageUrl={assetShopMap.fruits[fruit.displayId]?.assetUrl ?? ""}
                                    price={fruit.price ?? 0}
                                    unlockedLevel={fruit.unlockLevel}
                                />
                            )
                        }}
                    />
                </>
            )
        }
        case ShopTab.Tiles: {
            const tiles = staticSwr.data.data.tiles
            const { totalLimit, totalPlacedItemCount } = getTileLimit({
                data: staticSwr.data?.data,
                placedItems: placedItemsSwrMutation.data?.data.placedItems ?? [],
            })
            return (
                <>
                    <div>
                        Limit: {`${totalPlacedItemCount}/${totalLimit}`}
                    </div>
                    <Spacer y={2} />
                    <GridTable
                        items={tiles}
                        contentCallback={(tile) => {
                            return (
                                <ShopCard
                                    onClick={() => {}}
                                    imageUrl={assetShopMap.tiles[tile.displayId]?.assetUrl ?? ""}
                                    price={tile.price ?? 0}
                                    unlockedLevel={tile.unlockLevel ?? 0}
                                />
                            )
                        }}
                    />
                </>
            )
        }   
        case ShopTab.Supplies: {
            const supplies = staticSwr.data.data.supplies.filter((supply) => supply.availableInShop)
            return (
                <GridTable  
                    items={supplies}
                    contentCallback={(supply) => {
                        return (
                            <ShopCard
                                onClick={() => {}}
                                imageUrl={assetShopMap.supplies[supply.displayId]?.assetUrl ?? ""}
                                price={supply.price ?? 0}
                                unlockedLevel={supply.unlockLevel ?? 0}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Tools: {
            const tools = staticSwr.data.data.tools.filter((tool) => tool.availableInShop)
            return (
                <GridTable
                    items={tools}
                    contentCallback={(tool) => {
                        return (
                            <ShopCard
                                onClick={() => {}}
                                imageUrl={assetShopMap.tools[tool.displayId]?.assetUrl ?? ""}
                                price={tool.price ?? 0}
                                unlockedLevel={tool.unlockLevel ?? 0}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Pets: {
            const pets = staticSwr.data.data.pets
            return (
                <GridTable
                    items={pets}
                    contentCallback={(pet) => {
                        if (!staticSwr.data?.data) {
                            throw new Error("Static data not found")
                        }
                        const { totalLimit, totalPlacedItemCount } = getPetLimit({
                            data: staticSwr.data?.data,
                            pet,
                            placedItems: placedItemsSwrMutation.data?.data.placedItems ?? [],
                        })
                        return (
                            <ShopCard
                                onClick={() => {}}
                                imageUrl={assetShopMap.pets[pet.displayId]?.assetUrl ?? ""}
                                price={pet.price ?? 0}
                                unlockedLevel={pet.unlockLevel ?? 0}
                                ownership={totalPlacedItemCount}
                                limit={totalLimit}
                                showLimit={true}
                            />
                        )
                    }}
                />
            )
        }
        default:
            return null
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader
                            title="Shop"
                            description="Purchase items from the shop."
                        />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <ScrollableTabs
                        value={shopTab}
                        onValueChange={(value) => dispatch(setShopTab(value as ShopTab))}
                        items={Object.values(shopTabMap)}
                    />
                    <Spacer y={4} />
                    <FilterBar
                        handleSearchResult={({ searchString }) => {
                            console.log(searchString)
                        }}
                    />
                    <Spacer y={4} />
                    {renderGridTable()}
                </div>
            </DialogContent>
        </Dialog>
    )
}
