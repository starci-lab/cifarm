import { PlacedItemType } from "../enums"
import { PlacedItemSchema } from "../schemas"
import { StaticData } from "./types"

export interface GetUpgradePriceParams {
  placedItem: PlacedItemSchema;
  staticData: StaticData;
}

export interface GetUpgradePriceResponse {
    upgradeable: boolean;
    upgradePrice?: number;
}

export const getUpgradePrice = ({
    placedItem,
    staticData,
}: GetUpgradePriceParams): GetUpgradePriceResponse => {
    const placedItemType = staticData.placedItemTypes?.find(
        (placedItemType) => placedItemType.id === placedItem.placedItemType
    )
    if (!placedItemType) throw new Error("Placed item type not found")
    if (placedItemType.type !== PlacedItemType.Building) throw new Error("Placed item is not a building")
    const building = staticData.buildings?.find(
        (building) => building.id === placedItemType.building
    )
    if (!building) throw new Error("Building not found")
    const nextUpgrade = building.upgrades?.find(
        (upgrade) => upgrade.upgradeLevel === (placedItem.buildingInfo?.currentUpgrade ?? 0) + 1
    )
    if (!nextUpgrade) throw new Error("Next upgrade not found")
    return {
        upgradeable: building.upgradeable,
        upgradePrice: nextUpgrade.upgradePrice,
    }
}