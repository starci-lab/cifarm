import { BaseAssetKey } from "@/game/assets"

export enum NeighborsTab {
    Random = "Random",
    Followed = "Followed",
}

export interface NeighborsTabData {
    iconKey: BaseAssetKey,
}

export const tabs: Record<NeighborsTab, NeighborsTabData> = {
    [NeighborsTab.Random]: {
        iconKey: BaseAssetKey.ModalNeighborsIconRandom,
    },
    [NeighborsTab.Followed]: {
        iconKey: BaseAssetKey.ModalNeighborsIconAdd,
    },
}