import React, { FC } from "react"
import { assetFruitMap, assetProductMap, assetShopMap, assetSuppliesMap, assetTerrainMap, assetTileMap, assetToolsMap } from "@/modules/assets"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ItemCard } from "./ItemCard"
import { CropId, FlowerId, FruitId } from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { SHEET_GAME_ITEM_DISCLOSURE } from "@/app/constants"
import { useDisclosure } from "react-use-disclosure"
import { setGameItemSheet } from "@/redux"
import { useAppDispatch } from "@/redux"

type ItemData = {
    name: string
    description: string
    assetKey: string
    assetUrl: string
}

type Category = {
    label: string
    items: Array<ItemData>
}

const categoryMap: Array<Category> = [
    { label: "Crops", items:
        Object.entries(assetProductMap)
            .filter(([id]) => Object.values(CropId).includes(id as CropId))
            .map(([, product]) => ({
                name: product.name,
                description: product.description,
                assetKey: product.base.assetKey,
                assetUrl: product.base.assetUrl
            }))
    },
    { label: "Flowers", items: 
        Object.entries(assetProductMap)
            .filter(([id]) => Object.values(FlowerId).includes(id as FlowerId))
            .map(([, product]) => ({
                name: product.name,
                description: product.description,
                assetKey: product.base.assetKey,
                assetUrl: product.base.assetUrl
            }))
    },
    { label: "Animals", items: 
        Object.values(assetShopMap.animals).map(animal => ({
            name: animal.name,
            description: animal.description,
            assetKey: animal.base.assetKey,
            assetUrl: animal.base.assetUrl
        }))
    },
    { label: "Buildings", items: 
        Object.values(assetShopMap.buildings).map(building => ({
            name: building.name,
            description: building.description,
            assetKey: building.base.assetKey,
            assetUrl: building.base.assetUrl
        }))
    },
    { label: "Fruits", items: 
        Object.entries(assetProductMap)
            .filter(([id]) => Object.values(FruitId).includes(id as FruitId))
            .map(([, fruit]) => ({
                name: fruit.name,
                description: fruit.description,
                assetKey: fruit.base.assetKey,
                assetUrl: fruit.base.assetUrl
            }))
    },
    { label: "Pets", items: 
        Object.values(assetShopMap.pets).map(pet => ({
            name: pet.name,
            description: pet.description,
            assetKey: pet.base.assetKey,
            assetUrl: pet.base.assetUrl
        }))
    },
    { label: "Supplies", items: 
        Object.values(assetSuppliesMap).map(supply => ({
            name: supply.name,
            description: supply.description,
            assetKey: supply.base.assetKey,
            assetUrl: supply.base.assetUrl
        }))
    },
    {
        label: "Terrains",
        items: Object.values(assetTerrainMap).map(terrain => ({
            name: terrain.name,
            description: terrain.description,
            assetKey: terrain.base.assetKey,
            assetUrl: terrain.base.assetUrl
        }))
    },
    { label: "Tiles", items: 
        Object.values(assetTileMap).map(tile => ({
            name: tile.name,
            description: tile.description,
            assetKey: tile.base.assetKey,
            assetUrl: tile.base.assetUrl
        }))
    },
    { label: "Tools", items: 
        Object.values(assetToolsMap).map(tool => ({
            name: tool.name,
            description: tool.description,
            assetKey: tool.base.assetKey,
            assetUrl: tool.base.assetUrl
        }))
    }
]

export const ItemsTab: FC = () => {
    const dispatch = useAppDispatch()

    const handleItemClick = (id: string, type: string) => {
        dispatch(setGameItemSheet({ 
            gameItemKey: id,
        }))
        openGameItemSheet()
    }

    const { open: openGameItemSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_GAME_ITEM_DISCLOSURE
    )

    return (
        <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
                {categoryMap.map((category) => (
                    <AccordionItem key={category.label} value={category.label}>
                        <AccordionTrigger className="text-lg font-semibold">
                            {category.label}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {category.items.map((item, idx) => (
                                    <div 
                                        key={item.assetKey || idx}
                                        onClick={() => handleItemClick(item.assetKey, category.label.toLowerCase())}
                                        className="cursor-pointer"
                                    >
                                        <ItemCard
                                            name={item.name}
                                            description={item.description}
                                            assetUrl={item.assetUrl}
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