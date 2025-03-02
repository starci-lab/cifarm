import { BaseAssetKey } from "@/game/assets"
import { TabData } from "../../elements"
import { QuestTab } from "./types"

export const ITEM_DATA_KEY = "item-data"

export const tabsConfig: Record<QuestTab, TabData> = {
    [QuestTab.Social]: {
        iconKey: BaseAssetKey.UIModalQuestBaseTab
    },
    [QuestTab.Daily]: {
        iconKey: BaseAssetKey.UIModalQuestDailyTab,
    },
}