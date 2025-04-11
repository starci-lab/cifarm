import { AssetData, Metadata } from "./types"
import { ToolId } from "../entities"

const PREFIX = "tools"

export interface AssetToolsData extends Metadata {
    base: AssetData
}
export const assetToolsMap: Record<ToolId, AssetToolsData> = {
    [ToolId.AnimalMedicine]: {
        name: "Animal Medicine",
        description: "Medicine for treating sick animals.",
        base: {
            assetKey: "tools-animal-medicine",
            assetUrl: `${PREFIX}/animal-medicine.png`
        },
    },
    [ToolId.BugNet]: {
        name: "Bug Net",
        description: "Tool for catching insects.",
        base: {
            assetKey: "tools-bug-net",
            assetUrl: `${PREFIX}/bug-net.png`
        },
    },
    [ToolId.Hammer]: {
        name: "Hammer",
        description: "Tool for building and repairs.",
        base: {
            assetKey: "tools-hammer",
            assetUrl: `${PREFIX}/hammer.png`
        },
    },
    [ToolId.Hand]: {
        name: "Hand",
        description: "Basic tool for interaction.",
        base: {
            assetKey: "tools-hand",
            assetUrl: `${PREFIX}/hand.png`
        },
    },
    [ToolId.Crate]: {
        name: "Crate",
        description: "Container for storing items.",
        base: {
            assetKey: "tools-crate",
            assetUrl: `${PREFIX}/crate.png`
        },
    },
    [ToolId.WateringCan]: {
        name: "Watering Can",
        description: "Tool for watering plants.",
        base: {
            assetKey: "tools-watering-can",
            assetUrl: `${PREFIX}/watering-can.png`
        },
    },
    [ToolId.Herbicide]: {
        name: "Herbicide",
        description: "Chemical for weed control.",
        base: {
            assetKey: "tools-herbicide",
            assetUrl: `${PREFIX}/herbicide.png`
        },
    },
    [ToolId.Pesticide]: {
        name: "Pesticide",
        description: "Chemical for pest control.",
        base: {
            assetKey: "tools-pesticide",
            assetUrl: `${PREFIX}/pesticide.png`
        },
    }     
}

