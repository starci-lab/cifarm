import { ScrollableTabData } from "@/components"
import { ShopTab } from "@/redux"

export const shopTabMap: Record<ShopTab, ScrollableTabData> = {
    [ShopTab.Seeds]: {
        label: "Seeds",
    },
    [ShopTab.Flowers]: {
        label: "Flowers",
    },
    [ShopTab.Animals]: {
        label: "Animals",
    },
    [ShopTab.Buildings]: {
        label: "Buildings",
    },
    [ShopTab.Fruits]: {
        label: "Fruits",
    },
    [ShopTab.Tiles]: {
        label: "Tiles",
    },
    [ShopTab.Supplies]: {
        label: "Supplies",
    },
    [ShopTab.Tools]: {
        label: "Tools",
    },
    [ShopTab.Pets]: {
        label: "Pets",
    },
    [ShopTab.Decorations]: {
        label: "Decorations",
    },
}

