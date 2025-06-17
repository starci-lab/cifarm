import {
    setShopTab,
    useAppDispatch,
    useAppSelector,
    setShopCrop,
    setShopFlower,
    setShopSupply,
    setShopTool,
} from "@/redux"
import React from "react"
import { FilterBar, Spacer, ScrollableTabs, GridTable } from "@/components"
import {
    SHOP_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { shopTabMap } from "./config"
import {
    BuyCropSeedsMessage,
    BuyFlowerSeedsMessage,
    BuySuppliesMessage,
    BuyToolMessage,
} from "@/hooks"
import { ShopCard } from "./ShopCard"
import { assetShopMap } from "@/modules/assets"
import {
    getAnimalLimit,
    getBuildingLimit,
    getFruitLimit,
    getTileLimit,
    getPetLimit,
} from "@/modules/entities"
import {
    BuyItemMessage,
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

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
    const { isOpen, toggle, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SHOP_MODAL_DISCLOSURE)
    const shopTab = useAppSelector((state) => state.tabReducer.shopTab)
    const dispatch = useAppDispatch()

    const shopState = useAppSelector((state) => state.wsLoadStateReducer.shop)

    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const placedItems = useAppSelector(
        (state) => state.apiReducer.coreApi.placedItems
    )
    const inventories = useAppSelector(
        (state) => state.apiReducer.coreApi.inventories
    )
    const user = useAppSelector((state) => state.apiReducer.coreApi.user)

    const renderGridTable = () => {
        if (!staticData) return null
        switch (shopTab) {
        case ShopTab.Seeds: {
            const crops = staticData.crops
            return (
                <GridTable
                    classNames={{
                        container: "grid grid-cols-3 gap-2",
                    }}
                    items={crops}
                    contentCallback={(crop) => {
                        return (
                            <ShopCard
                                isLoading={shopState.crops[crop.displayId]}
                                onTap={() => {
                                    dispatch(
                                        setShopCrop({ cropId: crop.displayId, isLoading: true })
                                    )
                                    const eventMessage: BuyCropSeedsMessage = {
                                        cropId: crop.displayId,
                                        quantity: 1,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestBuyCropSeeds,
                                        eventMessage
                                    )
                                }}
                                onPress={(pressTime) => {
                                    dispatch(
                                        setShopCrop({ cropId: crop.displayId, isLoading: true })
                                    )
                                    const maxQuantity = Math.floor(
                                        (user?.golds ?? 0) / crop.price
                                    )
                                    const eventMessage: BuyCropSeedsMessage = {
                                        cropId: crop.displayId,
                                        quantity: Math.min(
                                            Math.floor(pressTime / 100),
                                            maxQuantity
                                        ),
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestBuyCropSeeds,
                                        eventMessage
                                    )
                                }}
                                imageUrl={
                                    assetShopMap.crops[crop.displayId]?.base.assetUrl ?? ""
                                }
                                price={crop.price}
                                unlockedLevel={crop.unlockLevel}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Flowers: {
            const flowers = staticData.flowers
            return (
                <GridTable
                    items={flowers}
                    classNames={{
                        container: "grid grid-cols-3 gap-2",
                    }}
                    contentCallback={(flower) => {
                        return (
                            <ShopCard
                                isLoading={shopState.flowers[flower.displayId]}
                                onTap={() => {
                                    dispatch(
                                        setShopFlower({
                                            flowerId: flower.displayId,
                                            isLoading: true,
                                        })
                                    )
                                    const eventMessage: BuyFlowerSeedsMessage = {
                                        flowerId: flower.displayId,
                                        quantity: 1,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestBuyFlowerSeeds,
                                        eventMessage
                                    )
                                }}
                                onPress={(pressTime) => {
                                    const maxQuantity = Math.floor(
                                        (user?.golds ?? 0) / flower.price
                                    )
                                    dispatch(
                                        setShopFlower({
                                            flowerId: flower.displayId,
                                            isLoading: true,
                                        })
                                    )
                                    const eventMessage: BuyFlowerSeedsMessage = {
                                        flowerId: flower.displayId,
                                        quantity: Math.min(
                                            Math.floor(pressTime / 100),
                                            maxQuantity
                                        ),
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestBuyFlowerSeeds,
                                        eventMessage
                                    )
                                }}
                                imageUrl={
                                    assetShopMap.flowers[flower.displayId]?.base.assetUrl ?? ""
                                }
                                price={flower.price}
                                unlockedLevel={flower.unlockLevel}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Animals: {
            const animals = staticData.animals
            return (
                <GridTable
                    items={animals}
                    classNames={{
                        container: "grid grid-cols-3 gap-2",
                    }}
                    contentCallback={(animal) => {
                        if (!staticData) {
                            throw new Error("Static data not found")
                        }
                        const { selectedLimit, placedItemCount } = getAnimalLimit({
                            data: staticData,
                            animal,
                            placedItems,
                            landLimitIndex: user?.landLimitIndex ?? 0,
                        })
                        return (
                            <ShopCard
                                onTap={() => {
                                    close()
                                    const placedItemType =
                      staticData.placedItemTypes.find(
                          (placedItemType) => placedItemType.animal === animal.id
                      )
                                    if (!placedItemType) {
                                        throw new Error("Placed item type not found")
                                    }
                                    const eventMessage: BuyItemMessage = {
                                        placedItemTypeId: placedItemType.id,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.BuyItem,
                                        eventMessage
                                    )
                                }}
                                imageUrl={
                                    assetShopMap.animals[animal.displayId]?.base.assetUrl ?? ""
                                }
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
            const buildings = staticData.buildings.filter(
                (building) => building.availableInShop
            )
            const { totalLimit, totalPlacedItemCount } = getBuildingLimit({
                data: staticData,
                building: buildings[0],
                placedItems,
                landLimitIndex: user?.landLimitIndex ?? 0,
            })
            return (
                <>
                    <div>Limit: {`${totalPlacedItemCount}/${totalLimit}`}</div>
                    <Spacer y={2} />
                    <GridTable
                        classNames={{
                            container: "grid grid-cols-3 gap-2",
                        }}
                        items={buildings}
                        contentCallback={(building) => {
                            if (!staticData) {
                                throw new Error("Static data not found")
                            }
                            const { selectedLimit, placedItemCount } = getBuildingLimit({
                                data: staticData,
                                building,
                                placedItems,
                                landLimitIndex: user?.landLimitIndex ?? 0,
                            })
                            return (
                                <ShopCard
                                    onTap={() => {
                                        close()
                                        const placedItemType =
                        staticData.placedItemTypes.find(
                            (placedItemType) =>
                                placedItemType.building === building.id
                        )
                                        if (!placedItemType) {
                                            throw new Error("Placed item type not found")
                                        }
                                        const eventMessage: BuyItemMessage = {
                                            placedItemTypeId: placedItemType.id,
                                        }
                                        ExternalEventEmitter.emit(
                                            ExternalEventName.BuyItem,
                                            eventMessage
                                        )
                                    }}
                                    imageUrl={
                                        assetShopMap.buildings[building.displayId]?.base
                                            .assetUrl ?? ""
                                    }
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
            const fruits = staticData.fruits.filter(
                (fruit) => fruit.availableInShop
            )
            const { totalLimit, totalPlacedItemCount } = getFruitLimit({
                data: staticData,
                placedItems,
                landLimitIndex: user?.landLimitIndex ?? 0,
            })
            return (
                <>
                    <div>Limit: {`${totalPlacedItemCount}/${totalLimit}`}</div>
                    <Spacer y={2} />
                    <GridTable
                        items={fruits}
                        classNames={{
                            container: "grid grid-cols-3 gap-2",
                        }}
                        contentCallback={(fruit) => {
                            return (
                                <ShopCard
                                    onTap={() => {
                                        close()
                                        const placedItemType =
                        staticData.placedItemTypes.find(
                            (placedItemType) => placedItemType.fruit === fruit.id
                        )
                                        if (!placedItemType) {
                                            throw new Error("Placed item type not found")
                                        }
                                        const eventMessage: BuyItemMessage = {
                                            placedItemTypeId: placedItemType.id,
                                        }
                                        ExternalEventEmitter.emit(
                                            ExternalEventName.BuyItem,
                                            eventMessage
                                        )
                                    }}
                                    imageUrl={
                                        assetShopMap.fruits[fruit.displayId]?.base.assetUrl ?? ""
                                    }
                                    disabled={(totalPlacedItemCount || 0) >= (totalLimit || 0)}
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
            const tiles = staticData.tiles
            const { totalLimit, totalPlacedItemCount } = getTileLimit({
                data: staticData,
                placedItems,
                landLimitIndex: user?.landLimitIndex ?? 0,
            })
            return (
                <>
                    <div>Limit: {`${totalPlacedItemCount}/${totalLimit}`}</div>
                    <Spacer y={2} />
                    <GridTable
                        classNames={{
                            container: "grid grid-cols-3 gap-2",
                        }}
                        items={tiles}
                        contentCallback={(tile) => {
                            return (
                                <ShopCard
                                    onTap={() => {
                                        close()
                                        const placedItemType =
                        staticData.placedItemTypes.find(
                            (placedItemType) => placedItemType.tile === tile.id
                        )
                                        if (!placedItemType) {
                                            throw new Error("Placed item type not found")
                                        }
                                        const eventMessage: BuyItemMessage = {
                                            placedItemTypeId: placedItemType.id,
                                        }
                                        ExternalEventEmitter.emit(
                                            ExternalEventName.BuyItem,
                                            eventMessage
                                        )
                                    }}
                                    imageUrl={
                                        assetShopMap.tiles[tile.displayId]?.base.assetUrl ?? ""
                                    }
                                    disabled={(totalPlacedItemCount || 0) >= (totalLimit || 0)}
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
            const supplies = staticData.supplies.filter(
                (supply) => supply.availableInShop
            )
            return (
                <GridTable
                    classNames={{
                        container: "grid grid-cols-3 gap-2",
                    }}
                    items={supplies}
                    contentCallback={(supply) => {
                        return (
                            <ShopCard
                                isLoading={shopState.supplies[supply.displayId]}
                                onTap={() => {
                                    dispatch(
                                        setShopSupply({
                                            supplyId: supply.displayId,
                                            isLoading: true,
                                        })
                                    )
                                    const eventMessage: BuySuppliesMessage = {
                                        supplyId: supply.displayId,
                                        quantity: 1,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestBuySupplies,
                                        eventMessage
                                    )
                                }}
                                onPress={(pressTime) => {
                                    const maxQuantity = Math.floor(
                                        (user?.golds ?? 0) / supply.price
                                    )
                                    dispatch(
                                        setShopSupply({
                                            supplyId: supply.displayId,
                                            isLoading: true,
                                        })
                                    )
                                    const eventMessage: BuySuppliesMessage = {
                                        supplyId: supply.displayId,
                                        quantity: Math.min(
                                            Math.floor(pressTime / 100),
                                            maxQuantity
                                        ),
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestBuySupplies,
                                        eventMessage
                                    )
                                }}
                                imageUrl={
                                    assetShopMap.supplies[supply.displayId]?.base.assetUrl ?? ""
                                }
                                price={supply.price ?? 0}
                                unlockedLevel={supply.unlockLevel ?? 0}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Tools: {
            const tools = staticData.tools.filter(
                (tool) => tool.availableInShop
            )
            return (
                <GridTable
                    classNames={{
                        container: "grid grid-cols-3 gap-2",
                    }}
                    items={tools}
                    contentCallback={(tool) => {
                        return (
                            <ShopCard
                                isLoading={shopState.tools[tool.displayId]}
                                disabled={(() => {
                                    const inventoryType =
                      staticData.inventoryTypes.find(
                          (inventoryType) => inventoryType.tool === tool.id
                      )
                                    return inventories.some(
                                        (inventory) =>
                                            inventory.inventoryType === inventoryType?.id
                                    )
                                })()}
                                onTap={() => {
                                    dispatch(
                                        setShopTool({ toolId: tool.displayId, isLoading: true })
                                    )
                                    const eventMessage: BuyToolMessage = {
                                        toolId: tool.displayId,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.RequestBuyTool,
                                        eventMessage
                                    )
                                }}
                                imageUrl={
                                    assetShopMap.tools[tool.displayId]?.base.assetUrl ?? ""
                                }
                                price={tool.price ?? 0}
                                unlockedLevel={tool.unlockLevel ?? 0}
                            />
                        )
                    }}
                />
            )
        }
        case ShopTab.Pets: {
            const pets = staticData.pets
            return (
                <GridTable
                    classNames={{
                        container: "grid grid-cols-3 gap-2",
                    }}
                    items={pets}
                    contentCallback={(pet) => {
                        if (!staticData) {
                            throw new Error("Static data not found")
                        }
                        const { totalLimit, totalPlacedItemCount } = getPetLimit({
                            data: staticData,
                            pet,
                            placedItems,
                            landLimitIndex: user?.landLimitIndex ?? 0,
                        })
                        return (
                            <ShopCard
                                onTap={() => {
                                    close()
                                    const placedItemType =
                      staticData.placedItemTypes.find(
                          (placedItemType) => placedItemType.pet === pet.id
                      )
                                    if (!placedItemType) {
                                        throw new Error("Placed item type not found")
                                    }
                                    const eventMessage: BuyItemMessage = {
                                        placedItemTypeId: placedItemType.id,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.BuyItem,
                                        eventMessage
                                    )
                                }}
                                imageUrl={
                                    assetShopMap.pets[pet.displayId]?.base.assetUrl ?? ""
                                }
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
        case ShopTab.Decorations: {
            const decorations = staticData.decorations
            return (
                <GridTable
                    items={decorations}
                    classNames={{
                        container: "grid grid-cols-3 gap-2",
                    }}
                    contentCallback={(decoration) => {
                        return (
                            <ShopCard
                                onTap={() => {
                                    close()
                                    const placedItemType =
                      staticData.placedItemTypes.find(
                          (placedItemType) =>
                              placedItemType.decoration === decoration.id
                      )
                                    if (!placedItemType) {
                                        throw new Error("Placed item type not found")
                                    }
                                    const eventMessage: BuyItemMessage = {
                                        placedItemTypeId: placedItemType.id,
                                    }
                                    ExternalEventEmitter.emit(
                                        ExternalEventName.BuyItem,
                                        eventMessage
                                    )
                                }}
                                imageUrl={
                                    assetShopMap.decorations[decoration.displayId]?.base
                                        .assetUrl ?? ""
                                }
                                price={decoration.price ?? 0}
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
                    <DialogTitle>Shop</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <ScrollableTabs
                        color="secondary"
                        value={shopTab}
                        onValueChange={(value) => dispatch(setShopTab(value as ShopTab))}
                        items={Object.values(shopTabMap)}
                    />
                    <Spacer y={4} />
                    <FilterBar
                        searchString={""}
                        onSearchStringChange={(value) => console.log(value)}
                    />
                    <Spacer y={4} />
                    {renderGridTable()}
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
