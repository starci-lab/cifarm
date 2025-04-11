import { ExternalEventEmitter, ExternalEventName, ModalName } from "../events"
import { assetIconMap } from "@/modules/assets"
import { AssetIcon } from "@/modules/assets"
import { PlayerContext } from "@/redux"

export interface ButtonData {
  text: string;
  onClick: () => void;
  availableIn: Array<PlayerContext>;
  imageSrc: string;
}
export const rightButtons: Array<ButtonData> = [
    {
        text: "Settings",
        imageSrc: assetIconMap[AssetIcon.Settings].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Settings,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Inventory",
        imageSrc: assetIconMap[AssetIcon.Inventory].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Inventory,
            })
        },
        availableIn: [PlayerContext.Neighbor, PlayerContext.Home],
    },
    {
        text: "Move",
        imageSrc: assetIconMap[AssetIcon.Move].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.MoveItem)
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Sell",
        imageSrc: assetIconMap[AssetIcon.Sell].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.SellItem)
        },
        availableIn: [PlayerContext.Home],
    },
]

export const leftButtons: Array<ButtonData> = [
    {
        text: "Shop",
        imageSrc: assetIconMap[AssetIcon.Shop].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Shop,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Roadside Stand",
        imageSrc: assetIconMap[AssetIcon.RoadsideStand].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.RoadsideStand,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Neighbors",
        imageSrc: assetIconMap[AssetIcon.Neighbors].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Neighbors,
            })
        },
        availableIn: [PlayerContext.Neighbor, PlayerContext.Home],
    },
    {
        text: "Back",
        imageSrc: assetIconMap[AssetIcon.Back].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.ReturnNormal)
        },
        availableIn: [
            PlayerContext.Moving,
            PlayerContext.Selling,
            PlayerContext.PlacingNFT,
            PlayerContext.Buying,
        ],
    },
]
