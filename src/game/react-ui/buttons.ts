import { ExternalEventEmitter, ExternalEventName, ModalName } from "../events"
import { assetIconMap, AssetIconId } from "@/modules/assets"
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
        imageSrc: assetIconMap[AssetIconId.Settings].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Settings,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Inventory",
        imageSrc: assetIconMap[AssetIconId.Inventory].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Inventory,
            })
        },
        availableIn: [PlayerContext.Neighbor, PlayerContext.Home],
    },
    {
        text: "Daily",
        imageSrc: assetIconMap[AssetIconId.Daily].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Daily,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Quests",
        imageSrc: assetIconMap[AssetIconId.Quests].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Quests,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Move",
        imageSrc: assetIconMap[AssetIconId.Move].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.MoveItem)
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Sell",
        imageSrc: assetIconMap[AssetIconId.Sell].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.SellItem)
        },
        availableIn: [PlayerContext.Home],
    },
]

export const leftButtons: Array<ButtonData> = [
    {
        text: "Shop",
        imageSrc: assetIconMap[AssetIconId.Shop].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Shop,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Roadside Stand",
        imageSrc: assetIconMap[AssetIconId.RoadsideStand].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.RoadsideStand,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "Neighbors",
        imageSrc: assetIconMap[AssetIconId.Neighbors].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Neighbors,
            })
        },
        availableIn: [PlayerContext.Neighbor, PlayerContext.Home],
    },
    {
        text: "Back",
        imageSrc: assetIconMap[AssetIconId.Back].base.assetUrl,
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
    {
        text: "Download",
        imageSrc: assetIconMap[AssetIconId.Download].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.Download,
            })
        },
        availableIn: [PlayerContext.Home],
    },
    {
        text: "NFT Storage",
        imageSrc: assetIconMap[AssetIconId.NFTStorage].base.assetUrl,
        onClick: () => {
            ExternalEventEmitter.emit(ExternalEventName.OpenModal, {
                modalName: ModalName.NFTStorage,
            })
        },
        availableIn: [PlayerContext.Home],
    },
]
