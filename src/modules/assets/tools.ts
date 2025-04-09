import { AssetData } from "./types"
import { ToolId } from "../entities"

const PREFIX = "tools"

export interface AssetToolsData {
    base: AssetData
}
export const assetToolsMap: Record<ToolId, AssetToolsData> = {
    [ToolId.AnimalMedicine]: {
        base: {
            assetUrl: `${PREFIX}/animal-medicine.png`
        },
    },
    [ToolId.BugNet]: {
        base: {
            assetUrl: `${PREFIX}/bug-net.png`
        },
    },
    [ToolId.Hammer]: {
        base: {
            assetUrl: `${PREFIX}/hammer.png`
        },
    },
    [ToolId.Hand]: {
        base: {
            assetUrl: `${PREFIX}/hand.png`
        },
    },
    [ToolId.Crate]: {
        base: {
            assetUrl: `${PREFIX}/crate.png`
        },
    },
    [ToolId.WateringCan]: {
        base: {
            assetUrl: `${PREFIX}/watering-can.png`
        },
    },
    [ToolId.Herbicide]: {
        base: {
            assetUrl: `${PREFIX}/herbicide.png`
        },
    },
    [ToolId.Pesticide]: {
        base: {
            assetUrl: `${PREFIX}/pesticide.png`
        },
    }     
}

