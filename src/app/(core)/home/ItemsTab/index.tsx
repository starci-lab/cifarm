import React, { FC } from "react"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components"
import { ItemCard } from "./ItemCard"
import {
    assetBuildingMap,
    assetProductMap,
    assetSuppliesMap,
    assetTerrainsMap,
    assetToolsMap,
} from "@/modules/assets"
import { assetShopMap } from "@/modules/assets"
import { BuildingId, ProductType } from "@/types"
import { envConfig } from "@/env"
import { useAppSelector } from "@/redux"

export interface ItemData {
  name: string;
  description: string;
  assetKey: string;
  assetUrl: string;
  isNFT?: boolean;
}

export interface Category {
  label: string;
  items: Array<ItemData>;
}

export const ItemsTab: FC = () => {
    // open document url + envConfig().documentUrl + type + "displayname"
    const handleItemClick = (url: string) => {
        window.open(envConfig().documentUrl + "wiki/" + url, "_blank")
    }

    const convertToSlug = (text: string) => {
        return text.toLowerCase().replace(/ /g, "-")
    }

    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const categoryMap: Array<Category> = [
        {
            label: "Crops",
            items: (staticData?.crops || []).map((crop) => {
                const _crop = staticData?.crops.find((_crop) => _crop.id === crop.id)
                if (!_crop) throw new Error("Crop not found")
                const _product = staticData?.products.find(
                    (_product) =>
                        _product.type === ProductType.Crop && _product.crop === _crop.id
                )
                if (!_product) throw new Error("Product not found")
                return {
                    name: assetProductMap[_product.displayId]?.name || "",
                    description: assetProductMap[_product.displayId]?.description || "",
                    assetKey: assetProductMap[_product.displayId]?.base.assetKey || "",
                    assetUrl: assetProductMap[_product.displayId]?.base.assetUrl || "",
                    isNFT: false,
                }
            }),
        },
        {
            label: "Flowers",
            items: (staticData?.flowers || []).map((flower) => {
                const _flower = staticData?.flowers.find(
                    (_flower) => _flower.id === flower.id
                )
                if (!_flower) throw new Error("Flower not found")
                const _product = staticData?.products.find(
                    (_product) =>
                        _product.type === ProductType.Flower &&
            _product.flower === _flower.id
                )
                if (!_product) throw new Error("Product not found")
                return {
                    name: assetProductMap[_product.displayId]?.name || "",
                    description: assetProductMap[_product.displayId]?.description || "",
                    assetKey: assetProductMap[_product.displayId]?.base.assetKey || "",
                    assetUrl: assetProductMap[_product.displayId]?.base.assetUrl || "",
                    isNFT: false,
                }
            }),
        },
        {
            label: "Animals",
            items: (staticData?.animals || []).map((animal) => {
                const _animal = staticData?.animals.find(
                    (_animal) => _animal.id === animal.id
                )
                if (!_animal) throw new Error("Animal not found")
                return {
                    name: assetShopMap.animals?.[animal.displayId]?.name || "",
                    description:
            assetShopMap.animals?.[animal.displayId]?.description || "",
                    assetKey:
            assetShopMap.animals?.[animal.displayId]?.base.assetKey || "",
                    assetUrl:
            assetShopMap.animals?.[animal.displayId]?.base.assetUrl || "",
                    isNFT: false,
                }
            }),
        },
        {
            label: "Buildings",
            items: (staticData?.buildings || []).map((building) => {
                const _building = staticData?.buildings.find(
                    (_building) => _building.id === building.id
                )
                //remove the home building
                if (_building?.displayId === BuildingId.Home)
                    return {
                        name: assetBuildingMap[BuildingId.Home]?.name || "",
                        description: assetBuildingMap[BuildingId.Home]?.description || "",
                        assetKey: assetBuildingMap[BuildingId.Home]?.base.assetKey || "",
                        assetUrl: assetBuildingMap[BuildingId.Home]?.base.assetUrl || "",
                        isNFT: false,
                    }

                if (!_building) throw new Error("Building not found")
                return {
                    name: assetShopMap.buildings?.[building.displayId]?.name || "",
                    description:
            assetShopMap.buildings?.[building.displayId]?.description || "",
                    assetKey:
            assetShopMap.buildings?.[building.displayId]?.base.assetKey || "",
                    assetUrl:
            assetShopMap.buildings?.[building.displayId]?.base.assetUrl || "",
                    isNFT: false,
                }
            }),
        },
        {
            label: "Fruits",
            items: (staticData?.fruits || []).map((fruit) => {
                const _fruit = staticData?.fruits.find(
                    (_fruit) => _fruit.id === fruit.id
                )
                if (!_fruit) throw new Error("Fruit not found")
                const _product = staticData?.products.find(
                    (_product) =>
                        _product.type === ProductType.Fruit && _product.fruit === _fruit.id
                )
                if (!_product) throw new Error("Product not found")
                return {
                    name: assetProductMap[_product.displayId].name,
                    description: assetProductMap[_product.displayId].description,
                    assetKey: assetProductMap[_product.displayId].base.assetKey,
                    assetUrl: assetProductMap[_product.displayId].base.assetUrl,
                    isNFT: _fruit.isNFT,
                }
            }),
        },
        {
            label: "Pets",
            items: (staticData?.pets || []).map((pet) => {
                const _pet = staticData?.pets.find((_pet) => _pet.id === pet.id)
                if (!_pet) throw new Error("Pet not found")
                return {
                    name: assetShopMap.pets?.[pet.displayId]?.name || "",
                    description: assetShopMap.pets?.[pet.displayId]?.description || "",
                    assetKey: assetShopMap.pets?.[pet.displayId]?.base.assetKey || "",
                    assetUrl: assetShopMap.pets?.[pet.displayId]?.base.assetUrl || "",
                    isNFT: false,
                }
            }),
        },
        {
            label: "Supplies",
            items: (staticData?.supplies || []).map((supply) => {
                return {
                    name: assetSuppliesMap[supply.displayId].name,
                    description: assetSuppliesMap[supply.displayId].description,
                    assetKey: assetSuppliesMap[supply.displayId].base.assetKey,
                    assetUrl: assetSuppliesMap[supply.displayId].base.assetUrl,
                    isNFT: false,
                }
            }),
        },
        {
            label: "Terrains",
            items: (staticData?.terrains || []).map((terrain) => {
                const _terrain = staticData?.terrains.find(
                    (_terrain) => _terrain.id === terrain.id
                )
                if (!_terrain) throw new Error("Terrain not found")
                return {
                    name: assetTerrainsMap[_terrain.displayId].name,
                    description: assetTerrainsMap[_terrain.displayId].description,
                    assetKey: assetTerrainsMap[_terrain.displayId].base.assetKey,
                    assetUrl: assetTerrainsMap[_terrain.displayId].base.assetUrl,
                    isNFT: false,
                }
            }),
        },
        {
            label: "Tiles",
            items: (staticData?.tiles || []).map((tile) => {
                const _tile = staticData?.tiles.find((_tile) => _tile.id === tile.id)
                if (!_tile) throw new Error("Tile not found")
                return {
                    name: assetShopMap.tiles?.[tile.displayId]?.name || "",
                    description: assetShopMap.tiles?.[tile.displayId]?.description || "",
                    assetKey: assetShopMap.tiles?.[tile.displayId]?.base.assetKey || "",
                    assetUrl: assetShopMap.tiles?.[tile.displayId]?.base.assetUrl || "",
                    isNFT: false,
                }
            }),
        },
        {
            label: "Tools",
            items: (staticData?.tools || []).map((tool) => {
                const _tool = staticData?.tools.find((_tool) => _tool.id === tool.id)
                if (!_tool) throw new Error("Tool not found")
                return {
                    name: assetToolsMap[_tool.displayId].name,
                    description: assetToolsMap[_tool.displayId].description,
                    assetKey: assetToolsMap[_tool.displayId].base.assetKey,
                    assetUrl: assetToolsMap[_tool.displayId].base.assetUrl,
                    isNFT: false,
                }
            }),
        },
    ]
    return (
        <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
                {categoryMap.map((category) => (
                    <AccordionItem key={category.label} value={category.label}>
                        <AccordionTrigger className="text-xl">
                            {category.label}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-wrap gap-4">
                                {category.items.map((item, idx) => (
                                    <div
                                        key={item.assetKey || idx}
                                        onClick={() =>
                                            handleItemClick(
                                                category.label.toLowerCase() +
                          "/" +
                          convertToSlug(item.name)
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        <ItemCard
                                            name={item.name}
                                            description={item.description}
                                            assetUrl={item.assetUrl}
                                            isNFT={item.isNFT}
                                        />
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
