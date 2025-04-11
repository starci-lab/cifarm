import { ExternalEventEmitter, ExternalEventName, ModalName } from "../events"
import { assetIconMap } from "@/modules/assets"
import { AssetIcon } from "@/modules/assets"


export enum ButtonAvailableIn {
    Home = "Home",
    Neighbor = "Neighbor",
    Both = "Both",
}
export interface ButtonData {
    text: string
    imgSrc: string
    onClick: () => void
    availableIn: ButtonAvailableIn
}
export const rightButtons: Array<ButtonData> = [
    {
        text: "Inventory",
        imgSrc: assetIconMap[AssetIcon.Inventory].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Inventory
            })
        },
        availableIn: ButtonAvailableIn.Both,
    },
]

export const leftButtons: Array<ButtonData> = [
    {
        text: "Shop",
        imgSrc: assetIconMap[AssetIcon.Shop].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Shop
            })
        },
        availableIn: ButtonAvailableIn.Both,
    },
    {
        text: "Roadside Stand",
        imgSrc: assetIconMap[AssetIcon.RoadsideStand].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.RoadsideStand
            })
        },
        availableIn: ButtonAvailableIn.Home,
    },
    {
        text: "Neighbors",
        imgSrc: assetIconMap[AssetIcon.Neighbors].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Neighbors
            })
        },
        availableIn: ButtonAvailableIn.Home,
    },
]
