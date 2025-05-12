import React, { FC } from "react"
import { assetShopMap, ShopData } from "@/modules/assets"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ItemCard } from "./ItemCard"

type Category = {
    label: string
    items: Array<ShopData>
}

const categoryMap: Array<Category> = [
    { label: "Seeds", items: Object.values(assetShopMap.crops) },
    { label: "Flowers", items: Object.values(assetShopMap.flowers) },
    { label: "Animals", items: Object.values(assetShopMap.animals) },
    { label: "Buildings", items: Object.values(assetShopMap.buildings) },
    { label: "Fruits", items: Object.values(assetShopMap.fruits) },
    { label: "Tiles", items: Object.values(assetShopMap.tiles) },
    { label: "Supplies", items: Object.values(assetShopMap.supplies) },
    { label: "Tools", items: Object.values(assetShopMap.tools) },
    { label: "Pets", items: Object.values(assetShopMap.pets) },
]

export const ItemsTab: FC = () => {
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
                                    <ItemCard
                                        key={item.base.assetKey || idx}
                                        name={item.name}
                                        description={item.description}
                                        assetUrl={item.base.assetUrl}
                                    />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}