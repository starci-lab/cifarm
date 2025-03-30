import { sessionDb } from "@/modules/dexie"
import axios from "axios"
import { Scene } from "phaser"
import { getAssetUrl } from "./utils"
import { FONT_DINOSAUR } from "../constants"

export const downloadFont = async () => {
    const fontKey = "font-dinosaur"
    const asset = await sessionDb.assets.filter((asset) => asset.key === fontKey).first()
    if (asset) {
        return asset.data
    }
    const { data } = await axios.get(getAssetUrl("fonts/Dinosaur.ttf"), {
        responseType: "blob",
    })
    await sessionDb.assets.add({ key: fontKey, data, version: 0 })
    return data
}

export const loadFont = async (scene: Scene) => {
    const fontData = await downloadFont()
    scene.load.font(FONT_DINOSAUR, URL.createObjectURL(fontData))
}
    