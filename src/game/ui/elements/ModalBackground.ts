import {
    ConstructorParams,
    ContainerLiteBaseConstructorParams,
} from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseText, TextColor } from "./BaseText"
import { BaseAssetKey } from "@/game/assets"
import { onGameObjectPress } from "../utils"
import { XButton } from "./XButton"
import { BaseTabs, BaseTabsOptions } from "./BaseTabs"

export enum Background {
  Large = "large",
  Medium = "medium",
  XLarge = "xlarge",
  Small = "small",
}

export enum ContainerType {
    Light = "light",
    Dark = "dark",
}

export interface BackgroundData {
    backgroundAssetKey: BaseAssetKey
    containerAssetKey?: BaseAssetKey
    darkContainerAssetKey?: BaseAssetKey
    containerOffsetY?: number
}

const map: Record<Background, BackgroundData> = {
    [Background.Large]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundLarge,
        containerAssetKey: BaseAssetKey.UIBackgroundLargeContainer,
        containerOffsetY: -100,
    },
    [Background.Medium]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundMedium,
        // containerAssetKey: BaseAssetKey.UIBackgroundMediumContainer,
    },
    [Background.XLarge]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundXLarge,
        darkContainerAssetKey: BaseAssetKey.UIBackgroundXLargeDarkContainer,
        // containerAssetKey: BaseAssetKey.UIBackgroundXLargeContainer,
        containerOffsetY: -100,
    },
    [Background.Small]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundSmall,
        containerAssetKey: BaseAssetKey.UIBackgroundSmallContainer,
        containerOffsetY: 20,
    },
}

export interface ModalBackgroundOptions {
  background: Background;
  title: string;
  onXButtonPress: (xButton: XButton) => void;
  originY?: number;
  titleFontSize?: number;
  container?: {
    type: ContainerType;
  },
  tabs?: {
    width: number;
    options: BaseTabsOptions
  }
}
export class ModalBackground extends ContainerLite {
    public xButton: XButton
    private titleText: BaseText
    private backgroundImage: Phaser.GameObjects.Image
    private uiContainer: ContainerLite
    public container: ContainerLite | undefined
    public containerImage: Phaser.GameObjects.Image | undefined
    private tabs: BaseTabs | undefined
    public containerOffsetY: number
    constructor({
        baseParams: { scene, children, height, width, x, y },
        options,
    }: ConstructorParams<
    ContainerLiteBaseConstructorParams,
    ModalBackgroundOptions
  >) {
        if (!options) {
            throw new Error("ModalBackground requires options")
        }
        const { background, title, onXButtonPress, originY = 1, titleFontSize = 48, container: containerConfig, tabs: tabsConfig } = options
        super(scene, x, y, width, height, children)
        const { backgroundAssetKey, containerAssetKey, containerOffsetY = 0, darkContainerAssetKey } = map[background]
        this.containerOffsetY = containerOffsetY
        this.backgroundImage = this.scene.add.image(0, 0, backgroundAssetKey).setOrigin(0.5, originY)
        this.uiContainer = this.scene.rexUI.add.container(0, 0)
        this.addLocal(this.uiContainer)
        this.uiContainer.addLocal(this.backgroundImage)

        if (containerConfig) {
            const { type } = containerConfig
            const assetKey = type === ContainerType.Dark ? darkContainerAssetKey : containerAssetKey
            if (!assetKey) {
                throw new Error("ContainerAssetKey is required")
            }
            this.containerImage = this.scene.add.image(0, 0, assetKey).setOrigin(0.5, originY).setY(containerOffsetY)
            this.container = this.scene.rexUI.add.container(0, 0)
            this.container.addLocal(this.containerImage)
            this.uiContainer.addLocal(this.container)
        }

        if (tabsConfig) {
            const { width: contentWidth, options } = tabsConfig
            this.tabs = new BaseTabs({
                baseParams: {
                    scene,
                    width: contentWidth,
                    y: -(this.backgroundImage.height - 350),
                },
                options
            })
            this.scene.add.existing(this.tabs)
            this.uiContainer.addLocal(this.tabs)
        }

        this.titleText = new BaseText({
            baseParams: {
                scene,
                text: title,
                x: 0,
                y: -(this.backgroundImage.height * originY - 75),
            },
            options: {
                fontSize: titleFontSize,
                textColor: TextColor.DarkBrown
            }
        })
        scene.add.existing(this.titleText)
        this.uiContainer.addLocal(this.titleText)
        this.xButton = new XButton({
            baseParams: {
                scene,
                config: {
                    x: 0,
                    y: 0,
                },
            },
            options: {
                onPress: () => onXButtonPress(this.xButton),
                disableInteraction: false,
            },
        }).layout().setPosition(this.backgroundImage.width / 2 - 75,-(this.backgroundImage.height * originY - 75))
        this.scene.add.existing(this.xButton)
        //.setPosition(0, -400)
        this.xButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this.xButton,
                onPress: () => onXButtonPress(this.xButton),
                animate: false,
                scene: this.scene,
            })
        })
        this.uiContainer.addLocal(this.xButton)
    }
}
