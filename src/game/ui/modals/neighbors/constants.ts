import { BaseAssetKey } from "@/game/assets"
import { TabData } from "../../elements"

export const ITEM_COUNT = 5

export enum NeighborsTab {
    World = "world",
    Followees = "followees",
}


export const tabsConfig: Record<NeighborsTab, TabData> = {
    [NeighborsTab.World]: {
        iconKey: BaseAssetKey.UIModalNeighborsTabWorld,
    },
    [NeighborsTab.Followees]: {
        iconKey: BaseAssetKey.UIModalNeighborsTabFollowees,
    },
}