import { AssetData } from "./types"
import { ToolId } from "../entities"

const PREFIX = "tools"

export interface AssetToolsData {
    base: AssetData
}
export const assetToolsMap: Record<ToolId, AssetToolsData> = {
    [ToolId.AnimalMedicine]: {
        base: {
            name: "Animal Medicine",
            assetUrl: `${PREFIX}/animal-medicine.png`
        },
    },
    [ToolId.BugNet]: {
        base: {
            name: "Bug Net",
            assetUrl: `${PREFIX}/bug-net.png`
        },
    },
    [ToolId.Hammer]: {
        base: {
            name: "Hammer",
            assetUrl: `${PREFIX}/hammer.png`
        },
    },
    [ToolId.Hand]: {
        base: {
            name: "Hand",
            assetUrl: `${PREFIX}/hand.png`
        },
    },
    [ToolId.Crate]: {
        base: {
            name: "Crate",
            assetUrl: `${PREFIX}/crate.png`
        },
    },
    [ToolId.WateringCan]: {
        base: {
            name: "Watering can",
            assetUrl: `${PREFIX}/watering-can.png`
        },
    },
    [ToolId.Herbicide]: {
        base: {
            name: "Herbicide",
            assetUrl: `${PREFIX}/herbicide.png`
        },
    },
    [ToolId.Pesticide]: {
        base: {
            name: "Pesticide",
            assetUrl: `${PREFIX}/pesticide.png`
        },
    }     
}

