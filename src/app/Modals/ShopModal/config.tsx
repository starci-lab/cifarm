import { ScrollableTabData } from "@/components"
import { ShopTab } from "@/redux"
import { SproutIcon, FlowerIcon, BuildingIcon } from "lucide-react"
import React from "react"

export const shopTabMap: Record<ShopTab, ScrollableTabData> = {
    [ShopTab.Seeds]: {
        label: "Seeds",
        icon: <SproutIcon className="w-5 h-5" />,
    },
    [ShopTab.Flowers]: {
        label: "Flowers",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
    [ShopTab.Animals]: {
        label: "Animals",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
    [ShopTab.Buildings]: {
        label: "Buildings",
        icon: <BuildingIcon className="w-5 h-5" />,
    },
    [ShopTab.Fruits]: {
        label: "Fruits",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
    [ShopTab.Tiles]: {
        label: "Tiles",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
    [ShopTab.Supplies]: {
        label: "Supplies",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
    [ShopTab.Tools]: {
        label: "Tools",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
    [ShopTab.Pets]: {
        label: "Pets",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
    [ShopTab.Decorations]: {
        label: "Decorations",
        icon: <FlowerIcon className="w-5 h-5" />,
    },
}

