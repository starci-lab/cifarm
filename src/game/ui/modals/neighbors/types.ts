import { BaseAssetKey } from "@/game/assets"

export enum NeighborsTab {
    Random = "Random",
    Followed = "Followed",
}

export interface NeighborsTabData {
    iconKey: BaseAssetKey,
    text: string,
}

export const tabs: Record<NeighborsTab, NeighborsTabData> = {
    [NeighborsTab.Random]: {
        iconKey: BaseAssetKey.ModalNeighborsIconRandom,
        text: "Random",
    },
    [NeighborsTab.Followed]: {
        iconKey: BaseAssetKey.ModalNeighborsIconAdd,
        text: "Followed",
    },
}