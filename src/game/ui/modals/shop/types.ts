export enum ShopTab {
    Seeds = "Seeds",
    Animals = "Animals",
    Buildings = "Buildings",
    Tiles = "Tiles",
    Trees = "Trees",
    Decorations = "Decorations",
    Others = "Others",
}

export interface ShopTabData {
    iconKey: string,
    offsets?: {
        x: number,
        y: number,
    },
    scale?: number,
}
